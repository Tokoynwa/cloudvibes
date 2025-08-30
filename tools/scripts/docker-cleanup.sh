#!/bin/bash

# Docker Cleanup Script - Removes ALL Docker data
set -e

echo "🧹 Docker Cleanup Script"
echo "========================"

function show_docker_usage() {
    echo "Current Docker usage:"
    echo ""
    echo "📦 Images:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" 2>/dev/null || echo "No images found"
    echo ""
    echo "🔧 Containers:"
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Image}}" 2>/dev/null || echo "No containers found"
    echo ""
    echo "💾 Volumes:"
    docker volume ls --format "table {{.Driver}}\t{{.Name}}" 2>/dev/null || echo "No volumes found"
    echo ""
    echo "🌐 Networks:"
    docker network ls --format "table {{.Name}}\t{{.Driver}}" 2>/dev/null || echo "No networks found"
    echo ""
}

function cleanup_containers() {
    echo "🛑 Stopping all running containers..."
    docker stop $(docker ps -q) 2>/dev/null || echo "No running containers to stop"
    
    echo "🗑️  Removing all containers..."
    docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"
}

function cleanup_images() {
    echo "🖼️  Removing all images..."
    docker rmi $(docker images -q) -f 2>/dev/null || echo "No images to remove"
}

function cleanup_volumes() {
    echo "💾 Removing all volumes..."
    docker volume rm $(docker volume ls -q) 2>/dev/null || echo "No volumes to remove"
}

function cleanup_networks() {
    echo "🌐 Removing custom networks..."
    docker network prune -f 2>/dev/null || echo "No networks to remove"
}

function cleanup_build_cache() {
    echo "🧹 Removing build cache..."
    docker builder prune -af 2>/dev/null || echo "No build cache to remove"
}

function system_prune() {
    echo "🚀 Running system-wide cleanup..."
    docker system prune -af --volumes 2>/dev/null || echo "System prune completed"
}

# Show current usage
echo "BEFORE cleanup:"
show_docker_usage

echo ""
echo "🚨 WARNING: This will remove ALL Docker data!"
echo "   - All containers (running and stopped)"
echo "   - All images" 
echo "   - All volumes"
echo "   - All networks"
echo "   - All build cache"
echo ""
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cleanup cancelled"
    exit 1
fi

echo ""
echo "🧹 Starting cleanup..."

# Step-by-step cleanup
cleanup_containers
cleanup_images
cleanup_volumes
cleanup_networks
cleanup_build_cache

# Final system prune
system_prune

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "AFTER cleanup:"
show_docker_usage

echo ""
echo "💽 Disk space reclaimed:"
docker system df 2>/dev/null || echo "Docker system df not available"

echo ""
echo "🎉 All Docker data has been removed!"
echo "Note: Docker daemon is still running. To stop it completely:"
echo "  macOS: Quit Docker Desktop from the menu bar"
echo "  Linux: sudo systemctl stop docker"