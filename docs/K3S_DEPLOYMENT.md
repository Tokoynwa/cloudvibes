# CloudVibes K3s Deployment Guide

## 🚀 Overview

CloudVibes is deployed on a K3s cluster running on server `216.87.32.17` with automatic SSL certificates and CI/CD via GitHub Actions.

## 🏗️ Current Setup

- **Server**: 216.87.32.17
- **Platform**: K3s (lightweight Kubernetes)
- **Domain**: https://cloudvibes.org
- **SSL**: Let's Encrypt (auto-renewing)
- **Ingress**: Traefik
- **Deployment**: Docker containers

## 🔧 Required GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

- **`SERVER_USER`**: Username for SSH connection to your server
- **`SERVER_SSH_KEY`**: Private SSH key for server access

## 🚀 Automatic Deployment

### Triggers
- Push to `main` branch → Production deployment
- Push to `dev` branch → Development deployment
- Manual trigger via GitHub Actions UI

### Process
1. 📋 Checkout code
2. 🔧 Setup Node.js and install dependencies
3. 🧪 Run tests
4. 📦 Build Next.js application
5. 🐳 Build Docker image
6. 🚀 SSH to server and deploy
7. 🏥 Health check

## 🛠️ Manual Deployment

### Using the deployment script:
```bash
# Deploy with automatic image tag
./tools/scripts/k3s-deploy.sh deploy

# Deploy with specific tag
./tools/scripts/k3s-deploy.sh deploy 20240831-123456

# Check deployment status
./tools/scripts/k3s-deploy.sh status

# Restart current deployment
./tools/scripts/k3s-deploy.sh restart

# Rollback to previous version
./tools/scripts/k3s-deploy.sh rollback

# Scale deployment
./tools/scripts/k3s-deploy.sh scale 3
```

### Direct commands on server:
```bash
# SSH to server
ssh user@216.87.32.17

# Navigate to project
cd /my-mcp-server/cloudvibes

# Build and deploy
IMAGE_TAG="$(date +%Y%m%d-%H%M%S)"
docker build -t cloudvibes:$IMAGE_TAG .
./tools/scripts/k3s-deploy.sh deploy $IMAGE_TAG
```

## 🔍 Monitoring

### Check Application Health
```bash
curl -s https://cloudvibes.org/api/health
```

### View Logs
```bash
# On server
kubectl logs -l app=cloudvibes --tail=50 -f
```

### Check K3s Resources
```bash
# On server
kubectl get pods,svc,ingress
kubectl get certificates
sudo k3s ctr images list | grep cloudvibes
```

## 📋 Kubernetes Resources

### Current Deployment
- **Namespace**: default
- **Deployment**: cloudvibes
- **Service**: cloudvibes (ClusterIP)
- **Ingress**: cloudvibes (Traefik with SSL)
- **Certificate**: cloudvibes-letsencrypt-tls

### Configuration Files
- Kubernetes manifests: `config/k8s/*.yaml`
- Deployment script: `tools/scripts/k3s-deploy.sh`

## 🚨 Troubleshooting

### Common Issues

1. **Deployment stuck**: Check server resources
   ```bash
   kubectl get pods
   kubectl describe pod <pod-name>
   ```

2. **SSL certificate issues**: Check cert-manager
   ```bash
   kubectl get certificates
   kubectl logs -n cert-manager -l app=cert-manager
   ```

3. **Image build failures**: Check Docker space
   ```bash
   docker system df
   docker system prune -f
   ```

4. **GitHub Actions failing**: Check server SSH access
   ```bash
   ssh -i ~/.ssh/private_key user@216.87.32.17
   ```

### Health Checks
- **Application**: https://cloudvibes.org
- **Health endpoint**: https://cloudvibes.org/api/health
- **SSL test**: `openssl s_client -connect cloudvibes.org:443`

## 🔄 Rollback Process

If something goes wrong:
```bash
# Quick rollback
./tools/scripts/k3s-deploy.sh rollback

# Manual rollback
kubectl rollout undo deployment/cloudvibes
kubectl rollout status deployment/cloudvibes
```

---

**✅ Simple, reliable K3s deployment on your dedicated server!**