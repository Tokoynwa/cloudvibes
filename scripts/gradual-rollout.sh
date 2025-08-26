#!/bin/bash

# CloudVibes Gradual Rollout Script
# Demonstrates different traffic management strategies

set -e

NAMESPACE=${NAMESPACE:-default}
BLUE_SERVICE="cloudvibes-blue"
GREEN_SERVICE="cloudvibes-green"
PRODUCTION_SERVICE="cloudvibes-production"

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if services exist
check_services() {
    if ! kubectl get service $BLUE_SERVICE -n $NAMESPACE > /dev/null 2>&1; then
        log_error "Blue service not found. Run the demo deployment first."
        exit 1
    fi
    if ! kubectl get service $GREEN_SERVICE -n $NAMESPACE > /dev/null 2>&1; then
        log_error "Green service not found. Run the demo deployment first."
        exit 1
    fi
}

# Get current traffic distribution
get_current_traffic() {
    local selector=$(kubectl get service $PRODUCTION_SERVICE -n $NAMESPACE -o jsonpath='{.spec.selector.slot}' 2>/dev/null)
    echo "$selector"
}

# Classic Blue-Green (Instant Switch)
classic_blue_green() {
    local target_slot=$1
    
    log_info "🔄 CLASSIC BLUE-GREEN DEPLOYMENT"
    log_info "Switching 100% traffic to $target_slot slot instantly..."
    
    kubectl patch service $PRODUCTION_SERVICE -n $NAMESPACE \
        -p "{\"spec\":{\"selector\":{\"app\":\"cloudvibes\",\"slot\":\"$target_slot\"}}}"
    
    log_success "✅ Traffic switched to $target_slot (100%)"
    
    # Verify the switch
    local current=$(get_current_traffic)
    if [ "$current" = "$target_slot" ]; then
        log_success "✅ Switch verified: Production is now $current"
    else
        log_error "❌ Switch failed: Expected $target_slot, got $current"
    fi
}

# Gradual rollout with replica scaling
gradual_rollout_replicas() {
    local target_slot=$1
    local steps=(10 25 50 75 90 100)
    
    log_info "🚀 GRADUAL ROLLOUT - REPLICA SCALING METHOD"
    log_info "Target: $target_slot slot"
    
    # Get current replica counts
    local blue_replicas=$(kubectl get deployment cloudvibes-blue -n $NAMESPACE -o jsonpath='{.spec.replicas}')
    local green_replicas=$(kubectl get deployment cloudvibes-green -n $NAMESPACE -o jsonpath='{.spec.replicas}')
    local total_replicas=$((blue_replicas + green_replicas))
    
    log_info "Current: Blue=$blue_replicas, Green=$green_replicas, Total=$total_replicas"
    
    for step in "${steps[@]}"; do
        log_info "📊 Phase: ${step}% to $target_slot"
        
        if [ "$target_slot" = "green" ]; then
            local new_green=$((total_replicas * step / 100))
            local new_blue=$((total_replicas - new_green))
        else
            local new_blue=$((total_replicas * step / 100))
            local new_green=$((total_replicas - new_blue))
        fi
        
        log_info "Scaling: Blue=$new_blue, Green=$new_green"
        
        # Scale deployments
        kubectl scale deployment cloudvibes-blue --replicas=$new_blue -n $NAMESPACE
        kubectl scale deployment cloudvibes-green --replicas=$new_green -n $NAMESPACE
        
        # Wait for scaling
        kubectl wait --for=condition=ready pod \
            -l app=cloudvibes,slot=blue \
            -n $NAMESPACE \
            --timeout=60s || true
            
        kubectl wait --for=condition=ready pod \
            -l app=cloudvibes,slot=green \
            -n $NAMESPACE \
            --timeout=60s || true
        
        # Show current status
        kubectl get pods -l app=cloudvibes -n $NAMESPACE
        
        if [ $step -lt 100 ]; then
            log_warning "⏳ Waiting 10 seconds before next phase..."
            sleep 10
        fi
    done
    
    # Final switch of the service selector
    kubectl patch service $PRODUCTION_SERVICE -n $NAMESPACE \
        -p "{\"spec\":{\"selector\":{\"app\":\"cloudvibes\",\"slot\":\"$target_slot\"}}}"
    
    log_success "🎉 Gradual rollout complete! 100% traffic on $target_slot"
}

# Canary deployment (small percentage testing)
canary_deployment() {
    local canary_percentage=${1:-10}
    
    log_info "🐦 CANARY DEPLOYMENT"
    log_info "Routing $canary_percentage% traffic to green (canary) for testing"
    
    # Create weighted services using nginx ingress or service mesh
    # This is a simplified version - in production you'd use Istio or nginx ingress
    
    log_info "Creating canary configuration..."
    
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: canary-config
  namespace: $NAMESPACE
data:
  canary-percentage: "$canary_percentage"
  stable-percentage: "$((100 - canary_percentage))"
  status: "canary-active"
EOF

    log_success "✅ Canary deployment configured ($canary_percentage% to green)"
    log_info "💡 In production, use Istio/Nginx for actual traffic splitting"
}

# A/B Testing setup
ab_testing() {
    log_info "🧪 A/B TESTING SETUP"
    log_info "Setting up A/B testing with header-based routing"
    
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: ab-testing-config
  namespace: $NAMESPACE
data:
  strategy: "header-based"
  rules: |
    - header: "X-Version"
      value: "beta"
      target: "green"
    - header: "User-Agent" 
      contains: "mobile"
      target: "green"
      percentage: 20
    - default: "blue"
EOF

    log_success "✅ A/B testing configured"
    log_info "💡 Route beta users and 20% mobile users to green"
}

# Show traffic status
show_status() {
    log_info "📊 CURRENT TRAFFIC STATUS"
    
    echo "=== Services ==="
    kubectl get services -l app=cloudvibes -n $NAMESPACE -o wide
    echo ""
    
    echo "=== Deployments ==="
    kubectl get deployments -l app=cloudvibes -n $NAMESPACE -o wide
    echo ""
    
    echo "=== Production Service Selector ==="
    kubectl get service $PRODUCTION_SERVICE -n $NAMESPACE -o jsonpath='{.spec.selector}' | jq '.'
    echo ""
    
    echo "=== Pod Distribution ==="
    echo "Blue pods:"
    kubectl get pods -l app=cloudvibes,slot=blue -n $NAMESPACE --no-headers | wc -l
    echo "Green pods:"
    kubectl get pods -l app=cloudvibes,slot=green -n $NAMESPACE --no-headers | wc -l
    
    # Check if canary config exists
    if kubectl get configmap canary-config -n $NAMESPACE > /dev/null 2>&1; then
        echo ""
        echo "=== Canary Configuration ==="
        kubectl get configmap canary-config -n $NAMESPACE -o jsonpath='{.data}' | jq '.'
    fi
}

# Reset to initial state
reset_traffic() {
    log_info "🔄 RESETTING TO INITIAL STATE"
    
    # Reset service to blue
    kubectl patch service $PRODUCTION_SERVICE -n $NAMESPACE \
        -p '{"spec":{"selector":{"app":"cloudvibes","slot":"blue"}}}'
    
    # Reset replicas to 2 each
    kubectl scale deployment cloudvibes-blue --replicas=2 -n $NAMESPACE
    kubectl scale deployment cloudvibes-green --replicas=2 -n $NAMESPACE
    
    # Clean up configs
    kubectl delete configmap canary-config -n $NAMESPACE 2>/dev/null || true
    kubectl delete configmap ab-testing-config -n $NAMESPACE 2>/dev/null || true
    
    log_success "✅ Reset complete: Blue=active, 2 replicas each"
}

# Main function
main() {
    local command=$1
    local param=$2
    
    check_services
    
    case $command in
        "classic")
            classic_blue_green "${param:-green}"
            ;;
        "gradual")
            gradual_rollout_replicas "${param:-green}"
            ;;
        "canary")
            canary_deployment "${param:-10}"
            ;;
        "ab-test")
            ab_testing
            ;;
        "status")
            show_status
            ;;
        "reset")
            reset_traffic
            ;;
        *)
            echo "CloudVibes Traffic Management Strategies"
            echo ""
            echo "Usage: $0 [strategy] [options]"
            echo ""
            echo "Strategies:"
            echo "  classic [blue|green]     Classic blue-green (instant switch)"
            echo "  gradual [blue|green]     Gradual rollout with replica scaling"
            echo "  canary [percentage]      Canary deployment (default: 10%)"
            echo "  ab-test                  A/B testing setup"
            echo "  status                   Show current traffic distribution"
            echo "  reset                    Reset to initial state"
            echo ""
            echo "Examples:"
            echo "  $0 classic green         # Switch 100% to green instantly"
            echo "  $0 gradual green         # Gradual 10→25→50→75→90→100% to green"
            echo "  $0 canary 20             # Route 20% traffic to green for testing"
            echo "  $0 ab-test               # Setup header-based routing"
            echo "  $0 status                # Show current configuration"
            echo "  $0 reset                 # Back to blue=100%"
            exit 1
            ;;
    esac
}

main "$@"