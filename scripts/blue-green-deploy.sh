#!/bin/bash

# CloudVibes Blue-Green Deployment Script
# Usage: ./blue-green-deploy.sh [deploy|switch|rollback|status] [image-tag]

set -e

NAMESPACE=${NAMESPACE:-default}
RELEASE_NAME=${RELEASE_NAME:-cloudvibes}
HELM_CHART=${HELM_CHART:-./helm/cloudvibes}
HEALTH_CHECK_RETRIES=${HEALTH_CHECK_RETRIES:-30}
HEALTH_CHECK_DELAY=${HEALTH_CHECK_DELAY:-10}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Helm chart exists
check_helm_chart() {
    if [ ! -d "$HELM_CHART" ]; then
        log_error "Helm chart not found at $HELM_CHART"
        exit 1
    fi
}

# Get current active slot
get_active_slot() {
    kubectl get configmap "$RELEASE_NAME-config" -n "$NAMESPACE" -o jsonpath='{.data.ACTIVE_SLOT}' 2>/dev/null || echo "blue"
}

# Store deployment history for rollback
store_deployment_history() {
    local slot=$1
    local image_tag=$2
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    
    # Create or update deployment history configmap
    kubectl create configmap "$RELEASE_NAME-history" -n "$NAMESPACE" \
        --from-literal="previous_slot=$(get_inactive_slot)" \
        --from-literal="previous_image=$(get_slot_image $(get_inactive_slot))" \
        --from-literal="current_slot=$slot" \
        --from-literal="current_image=$image_tag" \
        --from-literal="deployment_time=$timestamp" \
        --from-literal="deployed_by=${USER:-system}" \
        --dry-run=client -o yaml | kubectl apply -f -
}

# Get deployment history
get_deployment_history() {
    echo "=== Deployment History ==="
    if kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" > /dev/null 2>&1; then
        echo "Current deployment:"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.current_slot}' | xargs -I {} echo "  Slot: {}"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.current_image}' | xargs -I {} echo "  Image: {}"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.deployment_time}' | xargs -I {} echo "  Time: {}"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.deployed_by}' | xargs -I {} echo "  By: {}"
        
        echo ""
        echo "Previous deployment:"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.previous_slot}' | xargs -I {} echo "  Slot: {}"
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data.previous_image}' | xargs -I {} echo "  Image: {}"
    else
        echo "No deployment history found"
    fi
    echo ""
}

# Get inactive slot
get_inactive_slot() {
    local active_slot=$(get_active_slot)
    if [ "$active_slot" = "blue" ]; then
        echo "green"
    else
        echo "blue"
    fi
}

# Health check function
health_check() {
    local slot=$1
    local retries=$HEALTH_CHECK_RETRIES
    
    log_info "Performing health check for $slot slot..."
    
    # Port forward to the slot service
    kubectl port-forward "service/$RELEASE_NAME-$slot" 8080:80 -n "$NAMESPACE" &
    local pf_pid=$!
    
    # Wait for port forward to be ready
    sleep 3
    
    for i in $(seq 1 $retries); do
        if curl -f -s http://localhost:8080/api/health > /dev/null 2>&1; then
            log_success "Health check passed for $slot slot (attempt $i/$retries)"
            kill $pf_pid 2>/dev/null || true
            return 0
        fi
        
        log_warning "Health check failed for $slot slot (attempt $i/$retries)"
        sleep $HEALTH_CHECK_DELAY
    done
    
    kill $pf_pid 2>/dev/null || true
    log_error "Health check failed for $slot slot after $retries attempts"
    return 1
}

# Deploy new version to inactive slot
deploy() {
    local image_tag=$1
    
    if [ -z "$image_tag" ]; then
        log_error "Image tag is required for deployment"
        exit 1
    fi
    
    local active_slot=$(get_active_slot)
    local inactive_slot=$(get_inactive_slot)
    
    log_info "Current active slot: $active_slot"
    log_info "Deploying version $image_tag to $inactive_slot slot"
    
    # Enable the inactive slot and set the image tag
    helm upgrade --install "$RELEASE_NAME" "$HELM_CHART" \
        --namespace "$NAMESPACE" \
        --create-namespace \
        --set "slots.$inactive_slot.enabled=true" \
        --set "slots.$inactive_slot.image.tag=$image_tag" \
        --set "blueGreen.activeSlot=$active_slot" \
        --wait \
        --timeout=300s
    
    log_success "Deployment to $inactive_slot slot completed"
    
    # Wait for pods to be ready
    log_info "Waiting for $inactive_slot slot pods to be ready..."
    kubectl wait --for=condition=ready pod \
        -l "app.kubernetes.io/instance=$RELEASE_NAME,app.kubernetes.io/slot=$inactive_slot" \
        -n "$NAMESPACE" \
        --timeout=300s
    
    # Perform health check
    if health_check "$inactive_slot"; then
        log_success "New version deployed successfully to $inactive_slot slot"
        log_info "Preview URL: kubectl port-forward service/$RELEASE_NAME-preview 8080:8080 -n $NAMESPACE"
        log_info "To switch traffic: $0 switch"
        log_info "To rollback: $0 rollback"
    else
        log_error "Health check failed for new deployment"
        exit 1
    fi
}

# Switch traffic to inactive slot (promote)
switch_traffic() {
    local active_slot=$(get_active_slot)
    local inactive_slot=$(get_inactive_slot)
    
    log_info "Current active slot: $active_slot"
    log_info "Switching traffic from $active_slot to $inactive_slot"
    
    # Perform final health check before switching
    if ! health_check "$inactive_slot"; then
        log_error "Health check failed for $inactive_slot slot. Aborting traffic switch."
        exit 1
    fi
    
    # Switch the active slot
    helm upgrade "$RELEASE_NAME" "$HELM_CHART" \
        --namespace "$NAMESPACE" \
        --reuse-values \
        --set "blueGreen.activeSlot=$inactive_slot" \
        --wait \
        --timeout=60s
    
    log_success "Traffic switched to $inactive_slot slot"
    
    # Verify the switch
    sleep 5
    local new_active_slot=$(get_active_slot)
    if [ "$new_active_slot" = "$inactive_slot" ]; then
        log_success "Traffic switch verified: $new_active_slot is now active"
    else
        log_error "Traffic switch verification failed"
        exit 1
    fi
}

# Rollback to previous slot
rollback() {
    local active_slot=$(get_active_slot)
    local inactive_slot=$(get_inactive_slot)
    
    log_warning "Rolling back from $active_slot to $inactive_slot"
    
    # Check if inactive slot is healthy
    if ! health_check "$inactive_slot"; then
        log_error "Rollback target ($inactive_slot) is not healthy. Manual intervention required."
        exit 1
    fi
    
    # Switch back to the previous slot
    helm upgrade "$RELEASE_NAME" "$HELM_CHART" \
        --namespace "$NAMESPACE" \
        --reuse-values \
        --set "blueGreen.activeSlot=$inactive_slot" \
        --wait \
        --timeout=60s
    
    log_success "Rollback completed: $inactive_slot is now active"
}

# Show deployment status
show_status() {
    local active_slot=$(get_active_slot)
    local inactive_slot=$(get_inactive_slot)
    
    echo "=== CloudVibes Blue-Green Deployment Status ==="
    echo "Namespace: $NAMESPACE"
    echo "Release: $RELEASE_NAME"
    echo "Active Slot: $active_slot"
    echo "Inactive Slot: $inactive_slot"
    echo ""
    
    echo "=== Deployments ==="
    kubectl get deployments -l "app.kubernetes.io/instance=$RELEASE_NAME" -n "$NAMESPACE" -o wide
    echo ""
    
    echo "=== Services ==="
    kubectl get services -l "app.kubernetes.io/instance=$RELEASE_NAME" -n "$NAMESPACE" -o wide
    echo ""
    
    echo "=== Pods ==="
    kubectl get pods -l "app.kubernetes.io/instance=$RELEASE_NAME" -n "$NAMESPACE" -o wide
    echo ""
    
    echo "=== Service URLs ==="
    echo "Production: kubectl port-forward service/$RELEASE_NAME 8080:80 -n $NAMESPACE"
    echo "Preview: kubectl port-forward service/$RELEASE_NAME-preview 8080:8080 -n $NAMESPACE"
    echo "Blue slot: kubectl port-forward service/$RELEASE_NAME-blue 8080:80 -n $NAMESPACE"
    echo "Green slot: kubectl port-forward service/$RELEASE_NAME-green 8080:80 -n $NAMESPACE"
}

# Main script logic
main() {
    local command=$1
    local image_tag=$2
    
    check_helm_chart
    
    case $command in
        "deploy")
            deploy "$image_tag"
            ;;
        "switch"|"promote")
            switch_traffic
            ;;
        "rollback")
            rollback
            ;;
        "status")
            show_status
            ;;
        *)
            echo "CloudVibes Blue-Green Deployment Tool"
            echo ""
            echo "Usage: $0 [command] [options]"
            echo ""
            echo "Commands:"
            echo "  deploy <image-tag>  Deploy new version to inactive slot"
            echo "  switch|promote      Switch traffic to inactive slot"
            echo "  rollback           Rollback to previous slot"
            echo "  status             Show current deployment status"
            echo ""
            echo "Environment Variables:"
            echo "  NAMESPACE             Kubernetes namespace (default: default)"
            echo "  RELEASE_NAME          Helm release name (default: cloudvibes)"
            echo "  HELM_CHART           Path to Helm chart (default: ./helm/cloudvibes)"
            echo "  HEALTH_CHECK_RETRIES  Health check retry count (default: 30)"
            echo "  HEALTH_CHECK_DELAY   Health check delay in seconds (default: 10)"
            echo ""
            echo "Examples:"
            echo "  $0 deploy v1.2.0"
            echo "  $0 switch"
            echo "  $0 rollback"
            echo "  $0 status"
            exit 1
            ;;
    esac
}

main "$@"