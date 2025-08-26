# 🔄 CloudVibes Blue-Green Deployment Guide

This guide covers the complete blue-green deployment strategy for CloudVibes using Helm and Kubernetes.

## 📋 Overview

Blue-Green deployment is a deployment strategy that reduces downtime and risk by running two identical production environments:

- **Blue Environment**: Current live production
- **Green Environment**: New version staging area

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Preview LB    │
│   (Production)  │    │   (Testing)     │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          │                      │
    ┌─────▼─────┐          ┌─────▼─────┐
    │   Blue    │          │   Green   │
    │ Deployment│◄────────►│Deployment │
    │ (Active)  │  Switch  │(Inactive) │
    └───────────┘          └───────────┘
```

## 🚀 Quick Start

### 1. Initial Deployment

```bash
# Deploy to blue slot (initial)
./scripts/blue-green-deploy.sh deploy v1.0.0

# Check status
./scripts/blue-green-deploy.sh status
```

### 2. Deploy New Version

```bash
# Deploy new version to inactive slot (green)
./scripts/blue-green-deploy.sh deploy v1.1.0

# Test the new version on preview URL
kubectl port-forward service/cloudvibes-preview 8080:8080 -n cloudvibes
```

### 3. Switch Traffic

```bash
# Switch production traffic to new version
./scripts/blue-green-deploy.sh switch
```

### 4. Rollback (if needed)

```bash
# Rollback to previous version
./scripts/blue-green-deploy.sh rollback
```

## 🛠️ Manual Helm Commands

### Deploy using Helm directly

```bash
# Install initial deployment (blue slot active)
helm install cloudvibes ./helm/cloudvibes \
  --namespace cloudvibes \
  --create-namespace \
  --set slots.blue.enabled=true \
  --set slots.blue.image.tag=v1.0.0 \
  --set blueGreen.activeSlot=blue

# Deploy to green slot
helm upgrade cloudvibes ./helm/cloudvibes \
  --namespace cloudvibes \
  --set slots.green.enabled=true \
  --set slots.green.image.tag=v1.1.0 \
  --set blueGreen.activeSlot=blue \
  --reuse-values

# Switch to green slot
helm upgrade cloudvibes ./helm/cloudvibes \
  --namespace cloudvibes \
  --set blueGreen.activeSlot=green \
  --reuse-values
```

## 🔧 Configuration

### Helm Values Configuration

Key configuration options in `values.yaml`:

```yaml
blueGreen:
  enabled: true
  activeSlot: blue  # Current active slot
  strategy:
    autoPromote: false  # Manual promotion
    autoPromoteDelaySeconds: 300
    healthCheck:
      enabled: true
      path: /api/health
      initialDelaySeconds: 30
      periodSeconds: 10
      successThreshold: 3

slots:
  blue:
    enabled: true
    image:
      tag: "v1.0.0"
    replicas: 3
  green:
    enabled: false  # Enable during deployment
    image:
      tag: "v1.1.0"
    replicas: 3
```

## 🌐 Service Architecture

### Service Types

1. **Production Service** (`cloudvibes`)
   - Routes to active slot
   - LoadBalancer type for external access
   - Port 80 → 3000

2. **Preview Service** (`cloudvibes-preview`)
   - Routes to inactive slot
   - For testing new versions
   - Port 8080 → 3000

3. **Slot Services** (`cloudvibes-blue`, `cloudvibes-green`)
   - Direct access to specific slots
   - ClusterIP type for internal testing
   - Port 80 → 3000

### Access URLs

```bash
# Production (active slot)
kubectl port-forward service/cloudvibes 8080:80 -n cloudvibes

# Preview (inactive slot)  
kubectl port-forward service/cloudvibes-preview 8080:8080 -n cloudvibes

# Direct slot access
kubectl port-forward service/cloudvibes-blue 8080:80 -n cloudvibes
kubectl port-forward service/cloudvibes-green 8080:80 -n cloudvibes
```

## 🚨 Health Checks

### Automated Health Monitoring

The deployment includes comprehensive health checks:

- **Liveness Probe**: Restarts unhealthy pods
- **Readiness Probe**: Removes unready pods from service
- **Deployment Health Check**: Validates new version before switching

### Health Check Endpoint

```bash
curl http://localhost:8080/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "api": "operational",
    "weather": "operational"
  }
}
```

## 🔄 GitHub Actions Integration

### Automated Workflows

1. **Continuous Deployment**
   - Triggers on push to main
   - Builds and deploys to inactive slot
   - Runs health checks

2. **Manual Operations**
   - Manual workflow dispatch
   - Choose action: deploy, switch, rollback, status
   - Specify image tag

### Workflow Triggers

```yaml
# Automatic deployment on push
on:
  push:
    branches: [ main ]

# Manual deployment control
workflow_dispatch:
  inputs:
    action:
      type: choice
      options: [deploy, switch, rollback, status]
    image_tag:
      default: 'latest'
```

## 📊 Monitoring and Observability

### Deployment Status

```bash
# Full deployment status
./scripts/blue-green-deploy.sh status

# Kubernetes resources
kubectl get deployments,services,pods -l app.kubernetes.io/instance=cloudvibes -n cloudvibes

# Real-time pod logs
kubectl logs -f deployment/cloudvibes-blue -n cloudvibes
kubectl logs -f deployment/cloudvibes-green -n cloudvibes
```

### Metrics and Alerts

- **Pod Metrics**: CPU, Memory usage per slot
- **Service Metrics**: Request rate, response time
- **Health Metrics**: Health check success rate
- **Deployment Metrics**: Switch frequency, rollback rate

## 🛡️ Safety Mechanisms

### Pre-Switch Validation

1. **Health Check Validation**: 30 attempts with 10s intervals
2. **Pod Readiness**: All pods must be ready
3. **Service Connectivity**: Service endpoints must respond
4. **Resource Limits**: Memory and CPU within limits

### Rollback Scenarios

- **Automatic Rollback**: On health check failures
- **Manual Rollback**: Via script or GitHub Actions
- **Rollback Validation**: Previous slot health verification

## 🔧 Troubleshooting

### Common Issues

1. **Health Check Failures**
   ```bash
   # Check pod logs
   kubectl logs -l app.kubernetes.io/slot=green -n cloudvibes
   
   # Check service endpoints
   kubectl get endpoints cloudvibes-green -n cloudvibes
   ```

2. **Image Pull Issues**
   ```bash
   # Check image availability in Minikube
   eval $(minikube docker-env)
   docker images | grep cloudvibes
   ```

3. **Service Not Switching**
   ```bash
   # Verify active slot configuration
   kubectl get configmap cloudvibes-config -n cloudvibes -o yaml
   
   # Check service selector
   kubectl get service cloudvibes -n cloudvibes -o yaml
   ```

### Debug Commands

```bash
# Port forward for debugging
kubectl port-forward deployment/cloudvibes-blue 8080:3000 -n cloudvibes

# Exec into pod
kubectl exec -it deployment/cloudvibes-blue -n cloudvibes -- /bin/sh

# Check pod environment
kubectl exec deployment/cloudvibes-blue -n cloudvibes -- env | grep SLOT
```

## 📈 Best Practices

### Deployment Strategy

1. **Always test in preview** before switching traffic
2. **Monitor health checks** during deployment
3. **Keep rollback capability** ready
4. **Use semantic versioning** for image tags
5. **Automate health validation** before switches

### Resource Management

1. **Resource Limits**: Set appropriate CPU/memory limits
2. **Replica Count**: Match production load requirements  
3. **Health Check Tuning**: Adjust timings based on app startup
4. **Image Management**: Clean up old images regularly

### Security Considerations

1. **Secret Management**: Use Kubernetes secrets for API keys
2. **Network Policies**: Restrict pod-to-pod communication
3. **RBAC**: Limit deployment permissions
4. **Image Scanning**: Scan images for vulnerabilities

## 📚 Advanced Topics

### Custom Health Checks

Extend the health check endpoint for more comprehensive validation:

```typescript
// Enhanced health check
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    weatherApi: await checkWeatherAPI(),
    redis: await checkRedis(),
    memory: checkMemoryUsage(),
    disk: checkDiskSpace()
  };
  
  const healthy = Object.values(checks).every(check => check.status === 'ok');
  
  return NextResponse.json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString()
  }, { status: healthy ? 200 : 503 });
}
```

### Multi-Environment Setup

```bash
# Production
helm install cloudvibes-prod ./helm/cloudvibes \
  --namespace production \
  --values values-prod.yaml

# Staging  
helm install cloudvibes-staging ./helm/cloudvibes \
  --namespace staging \
  --values values-staging.yaml
```

### Integration with Service Mesh

For advanced traffic management, integrate with Istio:

```yaml
# Istio VirtualService for traffic splitting
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: cloudvibes-traffic-split
spec:
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: cloudvibes-green
  - route:
    - destination:
        host: cloudvibes-blue
      weight: 100
```

## 🎯 Summary

CloudVibes blue-green deployment provides:

- ✅ **Zero-downtime deployments**
- ✅ **Instant rollback capability** 
- ✅ **Production testing environment**
- ✅ **Automated health validation**
- ✅ **GitOps integration**
- ✅ **Comprehensive monitoring**

This setup ensures reliable, safe deployments for your CloudVibes weather application with minimal risk and maximum availability.