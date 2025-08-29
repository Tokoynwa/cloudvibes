#!/bin/bash

set -e

ENVIRONMENT=${1:-dev}
ACTION=${2:-deploy}
RESOURCE_GROUP="cloudvibes-${ENVIRONMENT}-rg"
AKS_CLUSTER="cloudvibes-${ENVIRONMENT}-aks"
ACR_NAME="cloudvibes${ENVIRONMENT}"
NAMESPACE="cloudvibes-${ENVIRONMENT}"

function usage() {
    echo "Usage: $0 [environment] [action]"
    echo "Environment: dev (default)"
    echo "Actions: deploy, status, restart, rollback, scale, logs"
    echo ""
    echo "Examples:"
    echo "  $0 dev deploy          # Deploy to dev environment"
    echo "  $0 dev status          # Check deployment status"
    echo "  $0 dev scale 3         # Scale to 3 replicas"
    echo "  $0 dev logs            # View application logs"
    exit 1
}

function check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    if ! command -v az &> /dev/null; then
        echo "❌ Azure CLI not found. Please install it first."
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl not found. Please install it first."
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

function get_aks_credentials() {
    echo "🔑 Getting AKS credentials..."
    az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --overwrite-existing
}

function deploy() {
    echo "🚀 Deploying CloudVibes to AKS $ENVIRONMENT environment..."
    
    # Build and push image
    echo "📦 Building and pushing Docker image..."
    IMAGE_TAG="${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S)"
    
    az acr login --name $ACR_NAME
    docker build -f Dockerfile.dev -t ${ACR_NAME}.azurecr.io/cloudvibes:$IMAGE_TAG .
    docker build -f Dockerfile.dev -t ${ACR_NAME}.azurecr.io/cloudvibes:latest .
    
    docker push ${ACR_NAME}.azurecr.io/cloudvibes:$IMAGE_TAG
    docker push ${ACR_NAME}.azurecr.io/cloudvibes:latest
    
    # Apply Kubernetes manifests
    echo "📋 Applying Kubernetes manifests..."
    kubectl apply -f k8s/aks/${ENVIRONMENT}/namespace.yaml
    kubectl apply -f k8s/aks/${ENVIRONMENT}/cluster-issuer.yaml
    kubectl apply -f k8s/aks/${ENVIRONMENT}/configmap.yaml
    kubectl apply -f k8s/aks/${ENVIRONMENT}/deployment.yaml
    kubectl apply -f k8s/aks/${ENVIRONMENT}/certificate.yaml
    kubectl apply -f k8s/aks/${ENVIRONMENT}/ingress.yaml
    
    # Update deployment with new image
    echo "🔄 Updating deployment with new image..."
    kubectl set image deployment/cloudvibes-${ENVIRONMENT} cloudvibes=${ACR_NAME}.azurecr.io/cloudvibes:$IMAGE_TAG -n $NAMESPACE
    
    # Wait for rollout
    echo "⏳ Waiting for rollout to complete..."
    kubectl rollout status deployment/cloudvibes-${ENVIRONMENT} -n $NAMESPACE --timeout=300s
    
    echo "✅ Deployment completed successfully!"
    echo "🌐 Application URL: https://${ENVIRONMENT}.cloudvibes.org"
}

function status() {
    echo "📊 Checking deployment status..."
    kubectl get pods,svc,ingress,certificates -n $NAMESPACE
}

function restart() {
    echo "🔄 Restarting deployment..."
    kubectl rollout restart deployment/cloudvibes-${ENVIRONMENT} -n $NAMESPACE
    kubectl rollout status deployment/cloudvibes-${ENVIRONMENT} -n $NAMESPACE
}

function rollback() {
    echo "⏪ Rolling back deployment..."
    kubectl rollout undo deployment/cloudvibes-${ENVIRONMENT} -n $NAMESPACE
    kubectl rollout status deployment/cloudvibes-${ENVIRONMENT} -n $NAMESPACE
}

function scale() {
    REPLICAS=${3:-2}
    echo "📏 Scaling deployment to $REPLICAS replicas..."
    kubectl scale deployment cloudvibes-${ENVIRONMENT} --replicas=$REPLICAS -n $NAMESPACE
}

function logs() {
    echo "📋 Viewing application logs..."
    kubectl logs -l app=cloudvibes-${ENVIRONMENT} -n $NAMESPACE --tail=50 -f
}

# Main execution
check_prerequisites
get_aks_credentials

case $ACTION in
    deploy)
        deploy
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    rollback)
        rollback
        ;;
    scale)
        scale
        ;;
    logs)
        logs
        ;;
    *)
        usage
        ;;
esac