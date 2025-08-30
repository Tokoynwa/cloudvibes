#!/bin/bash

# CloudVibes Deployment Monitoring Script
# Monitor blue-green deployment status and application health

set -e

NAMESPACE=${NAMESPACE:-default}
RELEASE_NAME=${RELEASE_NAME:-cloudvibes}

echo "=== 🌟 CloudVibes Deployment Monitor ==="
echo "Namespace: $NAMESPACE"
echo "Release: $RELEASE_NAME"
echo "Timestamp: $(date)"
echo ""

# Function to get deployment status
get_deployment_status() {
    echo "=== 🚀 Deployment Status ==="
    ./scripts/blue-green-deploy.sh status
    echo ""
}

# Function to monitor pods
monitor_pods() {
    echo "=== 📦 Pod Health Status ==="
    kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME
    echo ""
    
    echo "=== 📊 Pod Resource Usage ==="
    kubectl top pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME 2>/dev/null || echo "Metrics server not available"
    echo ""
}

# Function to check services
check_services() {
    echo "=== 🌐 Service Status ==="
    kubectl get services -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME
    echo ""
}

# Function to test application endpoints
test_endpoints() {
    echo "=== 🔍 Application Health Tests ==="
    
    # Test production endpoint
    echo "Testing production service..."
    kubectl port-forward service/$RELEASE_NAME 8080:80 -n $NAMESPACE &
    PROD_PID=$!
    sleep 3
    
    # Test main endpoints
    endpoints=("/api/health" "/about" "/blog" "/widgets" "/guides" "/contact")
    
    for endpoint in "${endpoints[@]}"; do
        if curl -s -f "http://localhost:8080$endpoint" > /dev/null; then
            echo "✅ $endpoint - OK"
        else
            echo "❌ $endpoint - FAIL"
        fi
    done
    
    # Test preview service if available
    if kubectl get service $RELEASE_NAME-preview -n $NAMESPACE > /dev/null 2>&1; then
        echo ""
        echo "Testing preview service..."
        kubectl port-forward service/$RELEASE_NAME-preview 8081:8080 -n $NAMESPACE &
        PREVIEW_PID=$!
        sleep 3
        
        for endpoint in "${endpoints[@]}"; do
            if curl -s -f "http://localhost:8081$endpoint" > /dev/null; then
                echo "✅ Preview $endpoint - OK"
            else
                echo "❌ Preview $endpoint - FAIL"
            fi
        done
        
        kill $PREVIEW_PID 2>/dev/null || true
    fi
    
    kill $PROD_PID 2>/dev/null || true
    echo ""
}

# Function to check logs
check_logs() {
    echo "=== 📝 Recent Application Logs ==="
    kubectl logs -l app.kubernetes.io/instance=$RELEASE_NAME -n $NAMESPACE --tail=10 --since=5m 2>/dev/null || echo "No recent logs available"
    echo ""
}

# Function to monitor in real-time
monitor_realtime() {
    echo "=== ⏱️ Real-time Monitoring (Press Ctrl+C to stop) ==="
    while true; do
        clear
        echo "=== CloudVibes Live Monitoring - $(date) ==="
        
        # Quick status
        kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | while read line; do
            echo "📦 $line"
        done
        
        echo ""
        kubectl get services -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | while read line; do
            echo "🌐 $line"  
        done
        
        echo ""
        echo "Press Ctrl+C to exit real-time monitoring"
        sleep 5
    done
}

# Main execution based on argument
case "${1:-status}" in
    "status")
        get_deployment_status
        monitor_pods
        check_services
        ;;
    "test")
        test_endpoints
        ;;
    "logs")
        check_logs
        ;;
    "health")
        get_deployment_status
        monitor_pods
        check_services
        test_endpoints
        check_logs
        ;;
    "watch"|"monitor")
        monitor_realtime
        ;;
    "all")
        get_deployment_status
        monitor_pods
        check_services
        test_endpoints
        check_logs
        echo "=== 🎯 Quick Access Commands ==="
        echo "Production: kubectl port-forward service/$RELEASE_NAME 8080:80 -n $NAMESPACE"
        echo "Preview: kubectl port-forward service/$RELEASE_NAME-preview 8080:8080 -n $NAMESPACE"
        echo "Logs: kubectl logs -f -l app.kubernetes.io/instance=$RELEASE_NAME -n $NAMESPACE"
        echo "Dashboard: minikube dashboard"
        ;;
    *)
        echo "Usage: $0 [status|test|logs|health|watch|all]"
        echo ""
        echo "Commands:"
        echo "  status  - Show deployment and pod status (default)"
        echo "  test    - Test application endpoints"
        echo "  logs    - Show recent application logs"
        echo "  health  - Full health check (status + test + logs)"
        echo "  watch   - Real-time monitoring"
        echo "  all     - Complete status report"
        ;;
esac