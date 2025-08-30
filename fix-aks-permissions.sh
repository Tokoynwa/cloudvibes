#!/bin/bash

# AKS Permissions Fix Script
set -e

SERVICE_PRINCIPAL_ID="2d01b3e9-a694-4b18-9eb2-45d794ce284c"
SUBSCRIPTION_ID="840fe31d-4467-4678-9ccf-f16ffc95ab0a"
RESOURCE_GROUP="rg-cloudvibes-dev"
AKS_CLUSTER="aks-cloudvibes-dev"

echo "🔍 Checking current AKS configuration..."

# Check if local accounts are disabled
echo "Checking local accounts status..."
az aks show --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --query "disableLocalAccounts"

# Check AAD configuration
echo "Checking Azure AD configuration..."
az aks show --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --query "aadProfile"

# Check current role assignments
echo "Checking current role assignments..."
az role assignment list --assignee $SERVICE_PRINCIPAL_ID --output table

echo ""
echo "🔧 Applying fixes..."

# Enable local accounts (most likely fix)
echo "Enabling local accounts on AKS cluster..."
az aks update --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --enable-local-accounts

# Grant additional permissions at subscription level
echo "Granting Azure Kubernetes Service Cluster Admin Role at subscription level..."
az role assignment create \
  --assignee $SERVICE_PRINCIPAL_ID \
  --role "Azure Kubernetes Service Cluster Admin Role" \
  --scope /subscriptions/$SUBSCRIPTION_ID \
  2>/dev/null || echo "Role already assigned or failed"

# Grant Contributor role at resource group level
echo "Granting Contributor role at resource group level..."
az role assignment create \
  --assignee $SERVICE_PRINCIPAL_ID \
  --role "Contributor" \
  --scope /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP \
  2>/dev/null || echo "Role already assigned or failed"

echo ""
echo "✅ Permissions fix complete!"
echo "Wait 5-10 minutes for Azure RBAC changes to propagate, then retry the GitHub Actions workflow."