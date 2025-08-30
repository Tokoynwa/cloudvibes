# CloudVibes ⛅

A modern weather application built with Next.js, deployed on K3s server with automatic CI/CD.

## 🚀 Quick Start

```bash
# Development
npm install
npm run dev

# Or use helper script
./tools/scripts/local-dev.sh dev
```

## 📁 Project Structure

```
cloudvibes/
├── 📁 src/                    # Application source code
│   ├── app/                   # Next.js app router pages
│   ├── components/            # Reusable React components
│   └── lib/                   # Utilities, types, and business logic
│
├── 📁 tools/                  # Development tools
│   ├── docker/                # Docker configurations
│   └── scripts/               # Deployment scripts
│       ├── local-dev.sh       # Local development helper
│       ├── docker-cleanup.sh  # Docker cleanup utility
│       └── k3s-deploy.sh      # K3s deployment script
│
├── 📁 config/                 # Configuration files
│   ├── k8s/                   # Kubernetes manifests
│   └── nginx/                 # Nginx configurations
│
├── 📁 docs/                   # Documentation
│   └── K3S_DEPLOYMENT.md     # Deployment guide
│
└── 📁 .github/                # GitHub Actions
    └── workflows/
        └── k3s-deploy.yml     # Auto deployment
```

## 🛠️ Development

### Local Development
```bash
# Start development server
./tools/scripts/local-dev.sh dev

# Build for production
./tools/scripts/local-dev.sh build

# Run tests
./tools/scripts/local-dev.sh test

# Docker development
./tools/scripts/local-dev.sh docker-dev
```

### Available Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run test:e2e` - End-to-end tests
- `npm run lint` - Code linting

## 🐳 Docker

```bash
# Development environment
docker-compose --profile dev up -d

# Production environment
docker-compose --profile prod up -d

# Manual Docker build
docker build -t cloudvibes .
docker run -p 3000:3000 cloudvibes
```

## 🚀 Deployment

### Automatic Deployment
- Push to `main` → Production deployment to https://cloudvibes.org
- Push to `dev` → Development deployment
- Uses GitHub Actions for CI/CD

### Manual Deployment
```bash
# Deploy to K3s server
./tools/scripts/k3s-deploy.sh deploy

# Check status
./tools/scripts/k3s-deploy.sh status

# Rollback if needed
./tools/scripts/k3s-deploy.sh rollback
```

## 🌐 Live Application

- **Production**: https://cloudvibes.org
- **Server**: K3s on 216.87.32.17
- **SSL**: Let's Encrypt (auto-renewing)
- **Health Check**: https://cloudvibes.org/api/health

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage

# All tests
./tools/scripts/local-dev.sh test
```

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Jest + Playwright
- **Deployment**: K3s Kubernetes
- **CI/CD**: GitHub Actions
- **SSL**: Let's Encrypt + Traefik

## 🔧 Setup

### GitHub Secrets Required
- `SERVER_USER` - SSH username for server access
- `SERVER_SSH_KEY` - Private SSH key for deployment

### Server Requirements
- K3s cluster running on 216.87.32.17
- Docker installed
- SSH access configured

## 📚 Documentation

- [K3s Deployment Guide](docs/K3S_DEPLOYMENT.md) - Complete deployment documentation

## 🚨 Troubleshooting

### Common Issues

**Application not starting:**
```bash
# Check logs
kubectl logs -l app=cloudvibes --tail=50

# Check deployment status
./tools/scripts/k3s-deploy.sh status
```

**Docker cleanup:**
```bash
./tools/scripts/docker-cleanup.sh
```

**SSL certificate issues:**
```bash
kubectl get certificates
openssl s_client -connect cloudvibes.org:443
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push branch: `git push origin feature/amazing-feature`
6. Create Pull Request

---

**⛅ Built with Next.js • Deployed on K3s • Always available at cloudvibes.org**