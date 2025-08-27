# CloudVibes CI/CD Setup Guide

## 🚀 Current Setup

Your CloudVibes application now has a complete CI/CD pipeline configured for deployment to your K3s cluster.

### 📋 What's Configured

#### ✅ GitHub Actions Workflows:
- **`k3s-deploy.yml`** - Main deployment workflow for K3s
- **`fast-deploy.yml`** - Legacy Minikube workflow (available but not active)
- **`test.yml`** - Test pipeline
- **`coverage.yml`** - Code coverage

#### ✅ Deployment Scripts:
- **`scripts/k3s-deploy.sh`** - K3s deployment management
- **`scripts/setup-github-runner.sh`** - Self-hosted runner setup
- **`scripts/blue-green-deploy.sh`** - Legacy Helm-based deployment

### 🔧 K3s Deployment Workflow

**Trigger:** Push to `main` branch or manual dispatch

**Steps:**
1. 📥 Checkout code
2. 🔧 Setup Node.js 20
3. 📦 Install dependencies & build
4. 🐳 Build Docker image with timestamp tag
5. 📥 Import image to K3s containerd
6. 🚀 Deploy to K3s cluster
7. 🏥 Health check at https://cloudvibes.org/api/health
8. 📊 Generate deployment summary

## 🏃 Setup Self-Hosted Runner

To enable automatic deployments, you need a GitHub Actions runner on your server:

### 1. Run Setup Script
```bash
cd /my-mcp-server/cloudvibes
./scripts/setup-github-runner.sh
```

### 2. Configure Runner
1. Go to your GitHub repository
2. Navigate to **Settings → Actions → Runners**
3. Click **"New self-hosted runner"**
4. Copy the configuration command
5. Run as the runner user:
   ```bash
   sudo -u github-runner -i
   cd /home/github-runner/actions-runner
   ./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN
   ```

### 3. Start Runner Service
```bash
systemctl start github-runner
systemctl status github-runner
```

## 📱 Manual Deployment

You can also deploy manually using the k3s deployment script:

### Deploy New Version
```bash
# Build and deploy
cd /my-mcp-server/cloudvibes
IMAGE_TAG="$(date +%Y%m%d-%H%M%S)-manual"
docker build -t cloudvibes:$IMAGE_TAG .
./scripts/k3s-deploy.sh deploy $IMAGE_TAG
```

### Other Commands
```bash
# Check status
./scripts/k3s-deploy.sh status

# Restart current deployment
./scripts/k3s-deploy.sh restart

# Rollback to previous version
./scripts/k3s-deploy.sh rollback

# Scale deployment
./scripts/k3s-deploy.sh scale 3
```

## 🌐 Current Deployment Status

- **Application URL**: https://cloudvibes.org
- **SSL Certificate**: Let's Encrypt (auto-renewing)
- **Kubernetes Cluster**: K3s on 216.87.32.17
- **Container Runtime**: containerd
- **Ingress Controller**: Traefik
- **Certificate Manager**: cert-manager

### Cluster Resources:
- **Namespace**: default
- **Deployment**: cloudvibes (2 replicas)
- **Service**: cloudvibes (ClusterIP)
- **Ingress**: cloudvibes (Traefik with SSL)
- **Certificate**: cloudvibes-letsencrypt-tls

## 🔍 Monitoring & Debugging

### Check Application Health
```bash
curl -s https://cloudvibes.org/api/health | jq
```

### View Logs
```bash
kubectl logs -l app=cloudvibes --tail=50 -f
```

### Check Deployments
```bash
kubectl get pods,svc,ingress
kubectl get certificates
```

### Scale Application
```bash
kubectl scale deployment cloudvibes --replicas=3
```

## 🚨 Troubleshooting

### Deployment Issues
1. Check runner service: `systemctl status github-runner`
2. View workflow logs in GitHub Actions tab
3. Check k3s cluster: `kubectl get pods`
4. Verify image import: `sudo k3s ctr images list | grep cloudvibes`

### SSL Issues
1. Check certificate status: `kubectl get certificates`
2. View cert-manager logs: `kubectl logs -n cert-manager -l app=cert-manager`
3. Test SSL: `openssl s_client -connect cloudvibes.org:443`

### Health Check Failures
1. Check pod status: `kubectl get pods`
2. View application logs: `kubectl logs -l app=cloudvibes`
3. Test internal connectivity: `kubectl exec -it POD_NAME -- curl localhost:3000/api/health`

## 🎯 Next Steps

1. **Set up monitoring** - Consider Prometheus/Grafana
2. **Add staging environment** - Create separate namespace
3. **Implement feature flags** - For safer deployments
4. **Add integration tests** - Extend CI pipeline
5. **Set up backups** - For k3s etcd data

---

**✅ Your CloudVibes CI/CD pipeline is ready!** 

Push code to the `main` branch and watch it automatically deploy to https://cloudvibes.org