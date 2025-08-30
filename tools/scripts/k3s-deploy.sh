#!/bin/bash

# CloudVibes K3s Deployment Script
# Usage: ./k3s-deploy.sh [deploy|status|restart|rollback] [image-tag]

set -e

NAMESPACE=${NAMESPACE:-default}
APP_NAME=${APP_NAME:-cloudvibes}
DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-cloudvibes}
IMAGE_NAME=${IMAGE_NAME:-cloudvibes}
KUBECONFIG=${KUBECONFIG:-/etc/rancher/k3s/k3s.yaml}

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

# Health check function
health_check() {
    local max_attempts=30
    local delay=10
    
    log_info "Performing health check..."
    
    for i in $(seq 1 $max_attempts); do
        if curl -f -s https://cloudvibes.org/api/health > /dev/null; then
            log_success "Health check passed (attempt $i/$max_attempts)"
            return 0
        fi
        
        log_warning "Health check failed (attempt $i/$max_attempts)"
        if [ $i -lt $max_attempts ]; then
            sleep $delay
        fi
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# Deploy new version
deploy() {
    local image_tag=$1
    
    if [ -z "$image_tag" ]; then
        log_error "Image tag is required for deployment"
        exit 1
    fi
    
    log_info "Deploying $IMAGE_NAME:$image_tag to K3s cluster"
    
    # Import image to k3s
    if docker image inspect "$IMAGE_NAME:$image_tag" > /dev/null 2>&1; then
        log_info "Importing image to k3s..."
        docker save "$IMAGE_NAME:$image_tag" | sudo k3s ctr images import -
    else
        log_error "Docker image $IMAGE_NAME:$image_tag not found"
        exit 1
    fi
    
    # Update deployment
    log_info "Updating Kubernetes deployment..."
    kubectl set image deployment/$DEPLOYMENT_NAME $APP_NAME="$IMAGE_NAME:$image_tag" -n $NAMESPACE
    
    # Wait for rollout
    log_info "Waiting for deployment rollout..."
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE --timeout=300s
    
    # Perform health check
    if health_check; then
        log_success "Deployment completed successfully!"
        log_info "Application is available at: https://cloudvibes.org"
    else
        log_error "Health check failed after deployment"
        exit 1
    fi
}

# Restart deployment
restart() {
    log_info "Restarting $DEPLOYMENT_NAME deployment"
    kubectl rollout restart deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    log_success "Restart completed"
}

# Rollback to previous version
rollback() {
    log_info "Rolling back $DEPLOYMENT_NAME to previous version"
    kubectl rollout undo deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    
    if health_check; then
        log_success "Rollback completed successfully"
    else
        log_error "Rollback completed but health check failed"
        exit 1
    fi
}

# Show deployment status
show_status() {
    echo "=== CloudVibes K3s Deployment Status ==="
    echo "Namespace: $NAMESPACE"
    echo "Deployment: $DEPLOYMENT_NAME"
    echo "Application URL: https://cloudvibes.org"
    echo ""
    
    echo "=== Deployments ==="
    kubectl get deployments -l app=$APP_NAME -n $NAMESPACE -o wide
    echo ""
    
    echo "=== Pods ==="
    kubectl get pods -l app=$APP_NAME -n $NAMESPACE -o wide
    echo ""
    
    echo "=== Services ==="
    kubectl get services -l app=$APP_NAME -n $NAMESPACE -o wide
    echo ""
    
    echo "=== Ingress ==="
    kubectl get ingress -n $NAMESPACE
    echo ""
    
    echo "=== Certificates ==="
    kubectl get certificates -n $NAMESPACE
    echo ""
    
    echo "=== Recent Events ==="
    kubectl get events --sort-by='.metadata.creationTimestamp' -n $NAMESPACE | tail -10
}

# Scale deployment
scale() {
    local replicas=$1
    
    if [ -z "$replicas" ]; then
        log_error "Number of replicas is required"
        exit 1
    fi
    
    log_info "Scaling $DEPLOYMENT_NAME to $replicas replicas"
    kubectl scale deployment/$DEPLOYMENT_NAME --replicas=$replicas -n $NAMESPACE
    kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE
    log_success "Scaling completed"
}

# Main script logic
main() {
    local command=$1
    local parameter=$2
    
    # Set kubeconfig
    export KUBECONFIG=$KUBECONFIG
    
    case $command in
        "deploy")
            deploy "$parameter"
            ;;
        "restart")
            restart
            ;;
        "rollback")
            rollback
            ;;
        "status")
            show_status
            ;;
        "scale")
            scale "$parameter"
            ;;
        *)
            echo "CloudVibes K3s Deployment Tool"
            echo ""
            echo "Usage: $0 [command] [options]"
            echo ""
            echo "Commands:"
            echo "  deploy <image-tag>    Deploy new version"
            echo "  restart               Restart current deployment"
            echo "  rollback             Rollback to previous version"
            echo "  scale <replicas>     Scale deployment"
            echo "  status               Show deployment status"
            echo ""
            echo "Environment Variables:"
            echo "  NAMESPACE            Kubernetes namespace (default: default)"
            echo "  APP_NAME            App label selector (default: cloudvibes)"
            echo "  DEPLOYMENT_NAME     Deployment name (default: cloudvibes)"
            echo "  IMAGE_NAME          Docker image name (default: cloudvibes)"
            echo "  KUBECONFIG          Kubeconfig path (default: /etc/rancher/k3s/k3s.yaml)"
            echo ""
            echo "Examples:"
            echo "  $0 deploy 20250827-123456-abc123f"
            echo "  $0 restart"
            echo "  $0 rollback"
            echo "  $0 scale 3"
            echo "  $0 status"
            exit 1
            ;;
    esac
}

main "$@"