# Docker Registry & Private Repository Setup

## 🐳 Docker Registry Options

### Option 1: GitHub Container Registry (Recommended - Free)

1. **Create GitHub Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `write:packages` and `read:packages` permissions
   - Save the token securely

2. **Login to GHCR:**
   ```bash
   # Login with your GitHub username and token
   echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u your-username --password-stdin
   ```

3. **Push to Registry:**
   ```bash
   # Using the local development script
   ./tools/scripts/local-dev.sh docker-push
   
   # Or manually
   docker tag cloudvibes:latest ghcr.io/your-username/cloudvibes:dev
   docker push ghcr.io/your-username/cloudvibes:dev
   ```

### Option 2: Docker Hub

1. **Create Docker Hub Account:** https://hub.docker.com

2. **Login:**
   ```bash
   docker login
   ```

3. **Push Images:**
   ```bash
   # Set registry in script or environment
   export DOCKER_REGISTRY="your-dockerhub-username"
   ./tools/scripts/local-dev.sh docker-push
   ```

## 🔒 Making Repository Private

### Step-by-Step Process:

1. **Go to Your Repository on GitHub:**
   - Navigate to https://github.com/Tokoynwa/cloudvibes

2. **Repository Settings:**
   - Click **Settings** tab (far right)
   - Scroll down to **Danger Zone**

3. **Change Visibility:**
   - Click **Change repository visibility**
   - Select **Make private**
   - Type your repository name to confirm
   - Click **I want to make this repository private**

### ⚠️ Important Notes:

- **GitHub Pages:** If you're using GitHub Pages, it will be disabled for private repos (unless you have GitHub Pro)
- **Collaborators:** You can still add collaborators to private repos
- **Actions:** GitHub Actions still work in private repos (with monthly limits)
- **Container Registry:** GHCR works with private repos

## 🔧 Update Workflow for Private Repository

When you make the repo private, update the GitHub Actions workflow to handle container registry authentication:

```yaml
# In .github/workflows/k3s-deploy.yml
- name: Login to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}

- name: Build and push Docker image
  run: |
    IMAGE_TAG="$(date +%Y%m%d-%H%M%S)"
    docker build -t ghcr.io/${{ github.repository_owner }}/cloudvibes:$IMAGE_TAG .
    docker push ghcr.io/${{ github.repository_owner }}/cloudvibes:$IMAGE_TAG
```

## 🚀 Quick Setup Commands

### For GitHub Container Registry:
```bash
# 1. Create GitHub token with packages permissions
# 2. Login
echo YOUR_TOKEN | docker login ghcr.io -u your-username --password-stdin

# 3. Update registry in local script
export DOCKER_REGISTRY="ghcr.io/your-username"

# 4. Push images
./tools/scripts/local-dev.sh docker-push
```

### For Docker Hub:
```bash
# 1. Create Docker Hub account
# 2. Login
docker login

# 3. Update registry in local script  
export DOCKER_REGISTRY="your-dockerhub-username"

# 4. Push images
./tools/scripts/local-dev.sh docker-push
```

## 📋 Registry Comparison

| Registry | Cost | Private Repos | Bandwidth | Build Integration |
|----------|------|---------------|-----------|-------------------|
| **GitHub Container Registry** | Free | ✅ Yes | 1GB/month free | ✅ Excellent |
| **Docker Hub** | Free tier | 1 private repo | 6 hrs/month | ✅ Good |
| **Self-hosted** | Server costs | ✅ Unlimited | ✅ Unlimited | ⚠️ Manual setup |

## 🔧 Configuration

### Set Default Registry:
Add to your shell profile (`.bashrc`, `.zshrc`):
```bash
export DOCKER_REGISTRY="ghcr.io/tokoynwa"  # GitHub Container Registry
# or
export DOCKER_REGISTRY="tokoynwa"          # Docker Hub
```

### Repository-specific Config:
Create `.env.local`:
```bash
DOCKER_REGISTRY=ghcr.io/tokoynwa
```

---

**✅ Recommended:** Use GitHub Container Registry for seamless integration with your private GitHub repository!