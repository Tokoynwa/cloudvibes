#!/bin/bash

# CloudVibes Enterprise Monitoring & Alerting System
# Comprehensive monitoring for production deployments

set -e

NAMESPACE=${NAMESPACE:-default}
RELEASE_NAME=${RELEASE_NAME:-cloudvibes}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Logging
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_metric() { echo -e "${PURPLE}[METRIC]${NC} $1"; }

# Enterprise Health Check
enterprise_health_check() {
    echo "=== 🏥 Enterprise Health Assessment ==="
    
    local health_score=0
    local max_score=10
    
    # Check 1: Pod health
    local running_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | grep Running | wc -l)
    local total_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | wc -l)
    
    if [ $running_pods -eq $total_pods ] && [ $total_pods -gt 0 ]; then
        log_success "Pod Health: $running_pods/$total_pods running"
        ((health_score++))
    else
        log_error "Pod Health: $running_pods/$total_pods running"
    fi
    
    # Check 2: Service availability
    if kubectl get service $RELEASE_NAME -n $NAMESPACE > /dev/null 2>&1; then
        log_success "Main service available"
        ((health_score++))
    else
        log_error "Main service unavailable"
    fi
    
    # Check 3: Blue-Green setup
    local blue_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/slot=blue --no-headers 2>/dev/null | wc -l)
    local green_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/slot=green --no-headers 2>/dev/null | wc -l)
    
    if [ $blue_pods -gt 0 ] && [ $green_pods -gt 0 ]; then
        log_success "Blue-Green deployment active (Blue: $blue_pods, Green: $green_pods)"
        ((health_score++))
    else
        log_warning "Blue-Green deployment incomplete (Blue: $blue_pods, Green: $green_pods)"
    fi
    
    # Check 4: Application endpoints
    log_info "Testing application endpoints..."
    kubectl port-forward service/$RELEASE_NAME 8080:80 -n $NAMESPACE &
    local pid=$!
    sleep 3
    
    local endpoints=("/api/health" "/" "/about" "/blog" "/widgets")
    local endpoint_score=0
    
    for endpoint in "${endpoints[@]}"; do
        if curl -f -s --max-time 5 "http://localhost:8080$endpoint" > /dev/null 2>&1; then
            log_success "Endpoint $endpoint: OK"
            ((endpoint_score++))
        else
            log_error "Endpoint $endpoint: FAILED"
        fi
    done
    
    kill $pid 2>/dev/null || true
    
    if [ $endpoint_score -eq ${#endpoints[@]} ]; then
        ((health_score+=2))
    elif [ $endpoint_score -gt 0 ]; then
        ((health_score++))
    fi
    
    # Check 5: Resource utilization
    local cpu_usage=$(kubectl top pods -n $NAMESPACE --no-headers 2>/dev/null | awk '{sum+=$2} END {print sum}' | sed 's/m//')
    local memory_usage=$(kubectl top pods -n $NAMESPACE --no-headers 2>/dev/null | awk '{sum+=$3} END {print sum}' | sed 's/Mi//')
    
    if [ ! -z "$cpu_usage" ] && [ ! -z "$memory_usage" ]; then
        if [ $cpu_usage -lt 1000 ] && [ $memory_usage -lt 1000 ]; then
            log_success "Resource usage: CPU ${cpu_usage}m, Memory ${memory_usage}Mi"
            ((health_score++))
        else
            log_warning "High resource usage: CPU ${cpu_usage}m, Memory ${memory_usage}Mi"
        fi
    else
        log_warning "Resource metrics not available"
    fi
    
    # Check 6: Deployment age
    local deployment_age=$(kubectl get deployment -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers 2>/dev/null | head -1 | awk '{print $5}')
    if [ ! -z "$deployment_age" ]; then
        log_success "Deployment age: $deployment_age"
        ((health_score++))
    fi
    
    # Overall health score
    local health_percentage=$((health_score * 100 / max_score))
    echo ""
    log_metric "Overall Health Score: $health_score/$max_score ($health_percentage%)"
    
    if [ $health_percentage -ge 90 ]; then
        log_success "🟢 System Status: EXCELLENT"
    elif [ $health_percentage -ge 70 ]; then
        log_warning "🟡 System Status: GOOD"
    else
        log_error "🔴 System Status: NEEDS ATTENTION"
    fi
    
    echo ""
}

# Performance Metrics
performance_metrics() {
    echo "=== 📊 Performance Metrics ==="
    
    # Pod metrics
    echo "Pod Resource Usage:"
    kubectl top pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --sort-by=cpu 2>/dev/null || log_warning "Metrics server not available"
    
    echo ""
    echo "Node Resource Usage:"
    kubectl top nodes 2>/dev/null || log_warning "Node metrics not available"
    
    echo ""
    echo "Pod Distribution:"
    kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME -o wide --no-headers | awk '{print $7}' | sort | uniq -c
    
    echo ""
}

# Application Response Time Test
response_time_test() {
    echo "=== ⏱️ Response Time Analysis ==="
    
    kubectl port-forward service/$RELEASE_NAME 8080:80 -n $NAMESPACE &
    local pid=$!
    sleep 3
    
    local endpoints=("/" "/api/health" "/about" "/blog")
    
    for endpoint in "${endpoints[@]}"; do
        local response_time=$(curl -o /dev/null -s -w '%{time_total}\n' "http://localhost:8080$endpoint" 2>/dev/null || echo "timeout")
        
        if [ "$response_time" != "timeout" ]; then
            local time_ms=$(echo "$response_time * 1000" | bc -l 2>/dev/null | cut -d. -f1)
            
            if [ $time_ms -lt 500 ]; then
                log_success "$endpoint: ${time_ms}ms (Excellent)"
            elif [ $time_ms -lt 1000 ]; then
                log_warning "$endpoint: ${time_ms}ms (Good)"
            else
                log_error "$endpoint: ${time_ms}ms (Slow)"
            fi
        else
            log_error "$endpoint: Timeout"
        fi
    done
    
    kill $pid 2>/dev/null || true
    echo ""
}

# Deployment Status Dashboard
deployment_dashboard() {
    echo "=== 🎛️ Enterprise Deployment Dashboard ==="
    
    ./scripts/blue-green-deploy.sh status
    
    echo "=== 📈 Traffic Distribution ==="
    local active_slot=$(kubectl get configmap "$RELEASE_NAME-config" -n "$NAMESPACE" -o jsonpath='{.data.ACTIVE_SLOT}' 2>/dev/null || echo "blue")
    echo "Active Traffic: $active_slot slot (100%)"
    
    local inactive_slot
    if [ "$active_slot" == "blue" ]; then
        inactive_slot="green"
    else
        inactive_slot="blue"
    fi
    echo "Standby: $inactive_slot slot (0%)"
    
    echo ""
    echo "=== 🔄 Recent Deployments ==="
    if kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" > /dev/null 2>&1; then
        kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o jsonpath='{.data}' | jq -r 'to_entries[] | "\(.key): \(.value)"' 2>/dev/null || kubectl get configmap "$RELEASE_NAME-history" -n "$NAMESPACE" -o yaml
    else
        echo "No deployment history available"
    fi
    
    echo ""
}

# Security and Compliance Check
security_check() {
    echo "=== 🔒 Security & Compliance Check ==="
    
    # Check for security contexts
    local pods_with_security=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME -o jsonpath='{.items[*].spec.securityContext}' | grep -c "runAsNonRoot\|readOnlyRootFilesystem" || echo "0")
    local total_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | wc -l)
    
    if [ $pods_with_security -gt 0 ]; then
        log_success "Security contexts configured"
    else
        log_warning "Consider adding security contexts for production"
    fi
    
    # Check resource limits
    local pods_with_limits=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME -o jsonpath='{.items[*].spec.containers[*].resources.limits}' | grep -c "cpu\|memory" || echo "0")
    
    if [ $pods_with_limits -gt 0 ]; then
        log_success "Resource limits configured"
    else
        log_warning "Resource limits recommended for production"
    fi
    
    # Check network policies
    local network_policies=$(kubectl get networkpolicy -n $NAMESPACE --no-headers | wc -l)
    if [ $network_policies -gt 0 ]; then
        log_success "Network policies in place ($network_policies)"
    else
        log_warning "Consider implementing network policies"
    fi
    
    echo ""
}

# Alert System
check_alerts() {
    echo "=== 🚨 Alert System ==="
    
    local alerts=()
    
    # Check for failed pods
    local failed_pods=$(kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | grep -v "Running\|Completed" | wc -l)
    if [ $failed_pods -gt 0 ]; then
        alerts+=("$failed_pods pods in failed state")
    fi
    
    # Check for high resource usage
    local high_cpu_pods=$(kubectl top pods -n $NAMESPACE --no-headers 2>/dev/null | awk '$2 > 400 {print $1}' | wc -l || echo "0")
    if [ $high_cpu_pods -gt 0 ]; then
        alerts+=("$high_cpu_pods pods with high CPU usage")
    fi
    
    # Check deployment staleness
    local old_deployments=$(kubectl get deployment -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME --no-headers | awk '$5 ~ /[0-9]+d/ {print $1}' | wc -l)
    if [ $old_deployments -gt 0 ]; then
        alerts+=("Deployment is more than 1 day old")
    fi
    
    if [ ${#alerts[@]} -eq 0 ]; then
        log_success "No active alerts"
    else
        for alert in "${alerts[@]}"; do
            log_error "ALERT: $alert"
        done
    fi
    
    echo ""
}

# Main execution
case "${1:-dashboard}" in
    "health")
        enterprise_health_check
        ;;
    "performance"|"perf")
        performance_metrics
        response_time_test
        ;;
    "security")
        security_check
        ;;
    "alerts")
        check_alerts
        ;;
    "dashboard"|"status")
        deployment_dashboard
        enterprise_health_check
        check_alerts
        ;;
    "full"|"complete")
        deployment_dashboard
        enterprise_health_check
        performance_metrics
        response_time_test
        security_check
        check_alerts
        echo "=== 🎯 Quick Commands ==="
        echo "Health check: ./scripts/enterprise-monitoring.sh health"
        echo "Performance: ./scripts/enterprise-monitoring.sh perf"
        echo "Security scan: ./scripts/enterprise-monitoring.sh security"
        echo "View alerts: ./scripts/enterprise-monitoring.sh alerts"
        ;;
    *)
        echo "Enterprise CloudVibes Monitoring System"
        echo ""
        echo "Usage: $0 [health|performance|security|alerts|dashboard|full]"
        echo ""
        echo "Commands:"
        echo "  health      - Comprehensive health assessment"
        echo "  performance - Performance metrics and response times"
        echo "  security    - Security and compliance check"
        echo "  alerts      - Check for system alerts"
        echo "  dashboard   - Deployment status dashboard (default)"
        echo "  full        - Complete monitoring report"
        ;;
esac