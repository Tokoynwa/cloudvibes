#!/bin/bash

# CloudVibes Local Development Script
set -e

function usage() {
    echo "CloudVibes Local Development Commands:"
    echo ""
    echo "Development:"
    echo "  $0 dev              - Start development server (hot reload)"
    echo "  $0 build            - Build for production"
    echo "  $0 start            - Start production server"
    echo "  $0 test             - Run all tests"
    echo ""
    echo "Docker:"
    echo "  $0 docker-dev       - Build & run development Docker container"
    echo "  $0 docker-prod      - Build & run production Docker container"
    echo "  $0 docker-build     - Just build Docker image"
    echo "  $0 docker-push      - Build and push to ACR (requires Azure login)"
    echo ""
    echo "Testing:"
    echo "  $0 test-unit        - Run unit tests"
    echo "  $0 test-e2e         - Run E2E tests"
    echo "  $0 test-coverage    - Run tests with coverage"
    echo ""
    echo "Cleanup:"
    echo "  $0 clean            - Clean build artifacts and node_modules"
    echo "  $0 docker-clean     - Remove local Docker images"
}

function dev() {
    echo "🚀 Starting development server..."
    npm install
    npm run dev
}

function build() {
    echo "📦 Building for production..."
    npm install
    npm run build
    echo "✅ Build complete! Run '$0 start' to test locally"
}

function start() {
    echo "🌐 Starting production server..."
    if [ ! -d ".next" ]; then
        echo "❌ No build found. Run '$0 build' first"
        exit 1
    fi
    npm start
}

function test_all() {
    echo "🧪 Running all tests..."
    npm install
    npm run test:ci
    echo "✅ All tests complete!"
}

function test_unit() {
    echo "🧪 Running unit tests..."
    npm run test
}

function test_e2e() {
    echo "🧪 Running E2E tests..."
    npm run test:e2e
}

function test_coverage() {
    echo "📊 Running tests with coverage..."
    npm run test:coverage
}

function docker_dev() {
    echo "🐳 Building and running development Docker container..."
    docker build -f Dockerfile.dev -t cloudvibes:dev .
    echo "🌐 Starting container at http://localhost:3000"
    docker run -p 3000:3000 --name cloudvibes-dev cloudvibes:dev
}

function docker_prod() {
    echo "🐳 Building and running production Docker container..."
    docker build -t cloudvibes:prod .
    echo "🌐 Starting container at http://localhost:3000"
    docker run -p 3000:3000 --name cloudvibes-prod cloudvibes:prod
}

function docker_build() {
    echo "🐳 Building Docker image..."
    docker build -t cloudvibes:latest .
    docker build -f Dockerfile.dev -t cloudvibes:dev .
    echo "✅ Docker images built:"
    docker images | grep cloudvibes
}

function docker_push() {
    echo "🚀 Building and pushing Docker images..."
    
    # Configuration - set your preferred registry
    REGISTRY=${DOCKER_REGISTRY:-"ghcr.io/tokoynwa"}  # GitHub Container Registry
    # REGISTRY=${DOCKER_REGISTRY:-"your-username"}     # Docker Hub
    # REGISTRY=${DOCKER_REGISTRY:-"your-registry.com"} # Self-hosted
    
    # Build with proper tags
    IMAGE_TAG="dev-$(date +%Y%m%d-%H%M%S)"
    
    echo "📦 Building images..."
    docker build -t cloudvibes:$IMAGE_TAG .
    docker build -t cloudvibes:latest .
    
    # Tag for registry
    docker tag cloudvibes:$IMAGE_TAG $REGISTRY/cloudvibes:$IMAGE_TAG
    docker tag cloudvibes:latest $REGISTRY/cloudvibes:dev-latest
    
    echo "🚀 Pushing to registry: $REGISTRY"
    echo "💡 Make sure you're logged in: docker login ghcr.io"
    
    # Push images
    docker push $REGISTRY/cloudvibes:$IMAGE_TAG || echo "❌ Push failed - make sure you're logged in"
    docker push $REGISTRY/cloudvibes:dev-latest || echo "❌ Push failed - make sure you're logged in"
    
    echo "✅ Images pushed!"
    echo "   - $REGISTRY/cloudvibes:$IMAGE_TAG"
    echo "   - $REGISTRY/cloudvibes:dev-latest"
}

function clean() {
    echo "🧹 Cleaning build artifacts..."
    rm -rf .next
    rm -rf node_modules
    rm -rf coverage
    rm -rf test-results
    rm -rf playwright-report
    echo "✅ Clean complete!"
}

function docker_clean() {
    echo "🧹 Removing local Docker images..."
    docker images | grep cloudvibes | awk '{print $3}' | xargs -r docker rmi -f || echo "No cloudvibes images found"
    docker container prune -f
    echo "✅ Docker cleanup complete!"
}

# Main command handling
case "${1:-help}" in
    dev)
        dev
        ;;
    build)
        build
        ;;
    start)
        start
        ;;
    test)
        test_all
        ;;
    test-unit)
        test_unit
        ;;
    test-e2e)
        test_e2e
        ;;
    test-coverage)
        test_coverage
        ;;
    docker-dev)
        docker_dev
        ;;
    docker-prod)
        docker_prod
        ;;
    docker-build)
        docker_build
        ;;
    docker-push)
        docker_push
        ;;
    clean)
        clean
        ;;
    docker-clean)
        docker_clean
        ;;
    help|*)
        usage
        ;;
esac