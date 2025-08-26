#!/bin/bash

# CloudVibes Docker Management Scripts

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[DOCKER]${NC} $1"
}

# Development commands
dev_build() {
    print_status "Building CloudVibes for development..."
    docker-compose --profile dev build cloudvibes-dev
}

dev_start() {
    print_status "Starting CloudVibes in development mode..."
    docker-compose --profile dev up -d cloudvibes-dev
    print_info "Development server running at http://localhost:3000"
    print_info "View logs: docker-compose --profile dev logs -f cloudvibes-dev"
}

dev_stop() {
    print_status "Stopping development containers..."
    docker-compose --profile dev down
}

dev_logs() {
    print_info "Showing development logs..."
    docker-compose --profile dev logs -f cloudvibes-dev
}

# Production commands
prod_build() {
    print_status "Building CloudVibes for production..."
    docker-compose --profile prod build cloudvibes
}

prod_start() {
    print_status "Starting CloudVibes in production mode..."
    docker-compose --profile prod up -d cloudvibes
    print_info "Production server running at http://localhost:3000"
    print_info "View logs: docker-compose --profile prod logs -f cloudvibes"
}

prod_stop() {
    print_status "Stopping production containers..."
    docker-compose --profile prod down
}

prod_logs() {
    print_info "Showing production logs..."
    docker-compose --profile prod logs -f cloudvibes
}

# Full stack with nginx and redis
full_start() {
    print_status "Starting full CloudVibes stack..."
    docker-compose --profile prod --profile nginx --profile cache up -d
    print_info "Full stack running:"
    print_info "  - App: http://localhost:3000"
    print_info "  - Nginx: http://localhost:80"
    print_info "  - Redis: localhost:6379"
}

full_stop() {
    print_status "Stopping full stack..."
    docker-compose --profile prod --profile nginx --profile cache down
}

# Utility commands
clean() {
    print_status "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    print_status "Cleanup complete!"
}

health_check() {
    print_info "Checking application health..."
    curl -f http://localhost:3000/api/health || print_error "Health check failed!"
}

rebuild() {
    print_status "Rebuilding CloudVibes..."
    docker-compose down
    docker-compose build --no-cache
    print_status "Rebuild complete!"
}

# Database backup (if using a database)
backup() {
    print_status "Creating backup..."
    docker-compose exec -T cloudvibes npm run backup 2>/dev/null || print_warning "No backup script found"
}

# Show running containers
status() {
    print_info "Docker container status:"
    docker-compose ps
}

# Show resource usage
stats() {
    print_info "Container resource usage:"
    docker stats --no-stream cloudvibes-dev cloudvibes-prod 2>/dev/null || print_warning "No containers running"
}

# Main command handler
case "$1" in
    # Development
    "dev:build"|"dev-build")
        dev_build
        ;;
    "dev:start"|"dev-start"|"dev")
        dev_start
        ;;
    "dev:stop"|"dev-stop")
        dev_stop
        ;;
    "dev:logs"|"dev-logs")
        dev_logs
        ;;
    
    # Production
    "prod:build"|"prod-build")
        prod_build
        ;;
    "prod:start"|"prod-start"|"prod")
        prod_start
        ;;
    "prod:stop"|"prod-stop")
        prod_stop
        ;;
    "prod:logs"|"prod-logs")
        prod_logs
        ;;
    
    # Full stack
    "full:start"|"full-start"|"full")
        full_start
        ;;
    "full:stop"|"full-stop")
        full_stop
        ;;
    
    # Utilities
    "clean")
        clean
        ;;
    "health")
        health_check
        ;;
    "rebuild")
        rebuild
        ;;
    "backup")
        backup
        ;;
    "status")
        status
        ;;
    "stats")
        stats
        ;;
    
    *)
        echo -e "${BLUE}CloudVibes Docker Management${NC}"
        echo ""
        echo "Development commands:"
        echo "  dev-build     Build development image"
        echo "  dev-start     Start development server"
        echo "  dev-stop      Stop development server"
        echo "  dev-logs      Show development logs"
        echo ""
        echo "Production commands:"
        echo "  prod-build    Build production image"
        echo "  prod-start    Start production server"
        echo "  prod-stop     Stop production server"
        echo "  prod-logs     Show production logs"
        echo ""
        echo "Full stack commands:"
        echo "  full-start    Start with nginx and redis"
        echo "  full-stop     Stop full stack"
        echo ""
        echo "Utility commands:"
        echo "  clean         Clean up Docker resources"
        echo "  health        Check application health"
        echo "  rebuild       Rebuild from scratch"
        echo "  backup        Create backup"
        echo "  status        Show container status"
        echo "  stats         Show resource usage"
        echo ""
        echo "Usage: ./docker-scripts.sh [command]"
        ;;
esac