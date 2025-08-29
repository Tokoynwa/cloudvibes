# AKS Dev Environment Setup Guide

## 🚀 Prerequisites

Before deploying to AKS, you need to set up the following Azure resources and GitHub secrets.

## 🏗️ Azure Resources Setup

### 1. Create Resource Group
```bash
az group create --name cloudvibes-dev-rg --location eastus
```

### 2. Create Azure Container Registry
```bash
az acr create --resource-group cloudvibes-dev-rg --name cloudvibesdev --sku Basic
```

### 3. Create AKS Cluster
```bash
az aks create \
  --resource-group cloudvibes-dev-rg \
  --name cloudvibes-dev-aks \
  --node-count 2 \
  --node-vm-size Standard_B2s \
  --attach-acr cloudvibesdev \
  --enable-addons ingress-appgw \
  --appgw-name cloudvibes-dev-appgw \
  --appgw-subnet-cidr "10.2.0.0/16" \
  --generate-ssh-keys
```

### 4. Install cert-manager
```bash
# Get AKS credentials
az aks get-credentials --resource-group cloudvibes-dev-rg --name cloudvibes-dev-aks

# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Wait for cert-manager to be ready
kubectl wait --for=condition=ready pod -l app=cert-manager -n cert-manager --timeout=60s
```

## 🔐 Service Principal Setup

### 1. Create Service Principal
```bash
az ad sp create-for-rbac --name "cloudvibes-dev-sp" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/cloudvibes-dev-rg \
  --sdk-auth
```

### 2. Grant ACR Access
```bash
# Get ACR resource ID
ACR_ID=$(az acr show --name cloudvibesdev --resource-group cloudvibes-dev-rg --query id --output tsv)

# Grant AcrPush role to service principal
az role assignment create --assignee {client-id} --role AcrPush --scope $ACR_ID
```

## 🔑 GitHub Secrets Configuration

### Step-by-Step Credential Setup:

1. **Login to Azure CLI**:
   ```bash
   az login
   ```

2. **Get Your Subscription ID**:
   ```bash
   az account show --query id --output tsv
   ```

3. **Create Service Principal**:
   ```bash
   # Replace {subscription-id} with your actual subscription ID
   az ad sp create-for-rbac --name "cloudvibes-github-actions" \
     --role contributor \
     --scopes /subscriptions/{subscription-id} \
     --json-auth
   ```

4. **Copy the Complete JSON Output** (example):
   ```json
   {
     "clientId": "12345678-1234-1234-1234-123456789012",
     "clientSecret": "your-client-secret-here",
     "subscriptionId": "87654321-4321-4321-4321-210987654321",
     "tenantId": "11111111-1111-1111-1111-111111111111"
   }
   ```

5. **Add to GitHub Secrets**:
   - Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `AZURE_CREDENTIALS`
   - Value: Paste the **entire JSON** from step 4
   - Click **Add secret**

### Required Secret:
- **AZURE_CREDENTIALS**: The complete JSON output from the service principal creation

## 🌐 DNS Setup (Optional)

If you want to use a custom domain like `dev.cloudvibes.org`:

1. **Create DNS Zone**:
   ```bash
   az network dns zone create --resource-group cloudvibes-dev-rg --name cloudvibes.org
   ```

2. **Get Application Gateway IP**:
   ```bash
   az network public-ip show --resource-group MC_cloudvibes-dev-rg_cloudvibes-dev-aks_eastus --name cloudvibes-dev-appgw-appgwpip --query ipAddress --output tsv
   ```

3. **Create DNS A Record**:
   ```bash
   az network dns record-set a add-record --resource-group cloudvibes-dev-rg --zone-name cloudvibes.org --record-set-name dev --ipv4-address {APP_GATEWAY_IP}
   ```

## 🚀 Deployment

### Automatic Deployment
Push to the `dev` branch to trigger automatic deployment:
```bash
git push origin dev
```

### Manual Deployment
Use the deployment script:
```bash
./scripts/aks-deploy.sh dev deploy
```

### Verify Deployment
```bash
# Check pods
kubectl get pods -n cloudvibes-dev

# Check services
kubectl get svc -n cloudvibes-dev

# Check ingress
kubectl get ingress -n cloudvibes-dev

# View logs
kubectl logs -l app=cloudvibes-dev -n cloudvibes-dev --tail=50
```

## 🔧 Troubleshooting

### Common Issues:

1. **ACR Login Failed**:
   ```bash
   az acr login --name cloudvibesdev
   ```

2. **AKS Credentials**:
   ```bash
   az aks get-credentials --resource-group cloudvibes-dev-rg --name cloudvibes-dev-aks --overwrite-existing
   ```

3. **cert-manager Issues**:
   ```bash
   kubectl get pods -n cert-manager
   kubectl logs -n cert-manager -l app=cert-manager
   ```

4. **Check Application Gateway**:
   ```bash
   kubectl get ingress -n cloudvibes-dev -o yaml
   ```

## 📊 Monitoring

### View Application Logs
```bash
./scripts/aks-deploy.sh dev logs
```

### Check Deployment Status
```bash
./scripts/aks-deploy.sh dev status
```

### Scale Application
```bash
./scripts/aks-deploy.sh dev scale 3
```

## 🎯 Application URLs

After successful deployment:
- **Application**: https://dev.cloudvibes.org (or the Application Gateway IP)
- **Health Check**: https://dev.cloudvibes.org/api/health

---

**✅ Your AKS dev environment is ready!**

Push code to the `dev` branch and watch it automatically deploy to Azure Kubernetes Service.