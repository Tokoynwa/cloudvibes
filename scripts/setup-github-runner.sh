#!/bin/bash

# GitHub Actions Self-Hosted Runner Setup
# Run this script to set up a self-hosted runner for CloudVibes CI/CD

set -e

RUNNER_USER="github-runner"
RUNNER_HOME="/home/$RUNNER_USER"
RUNNER_DIR="$RUNNER_HOME/actions-runner"

echo "🚀 Setting up GitHub Actions Self-Hosted Runner"
echo "=============================================="

# Create runner user
if ! id "$RUNNER_USER" &>/dev/null; then
    echo "📝 Creating runner user: $RUNNER_USER"
    useradd -m -s /bin/bash $RUNNER_USER
    usermod -aG docker $RUNNER_USER
    usermod -aG sudo $RUNNER_USER
    
    # Allow runner to use k3s without password
    echo "$RUNNER_USER ALL=(ALL) NOPASSWD: /usr/local/bin/k3s" >> /etc/sudoers.d/k3s-runner
else
    echo "✅ Runner user $RUNNER_USER already exists"
fi

# Create runner directory
echo "📁 Setting up runner directory: $RUNNER_DIR"
sudo -u $RUNNER_USER mkdir -p $RUNNER_DIR
cd $RUNNER_DIR

# Download and extract the latest runner
echo "⬇️ Downloading GitHub Actions Runner"
RUNNER_VERSION="2.317.0"
RUNNER_ARCH="x64"

if [ ! -f "bin/Runner.Listener" ]; then
    sudo -u $RUNNER_USER curl -o actions-runner-linux-$RUNNER_ARCH-$RUNNER_VERSION.tar.gz \
        -L https://github.com/actions/runner/releases/download/v$RUNNER_VERSION/actions-runner-linux-$RUNNER_ARCH-$RUNNER_VERSION.tar.gz
    
    sudo -u $RUNNER_USER tar xzf actions-runner-linux-$RUNNER_ARCH-$RUNNER_VERSION.tar.gz
    sudo -u $RUNNER_USER rm actions-runner-linux-$RUNNER_ARCH-$RUNNER_VERSION.tar.gz
else
    echo "✅ GitHub Actions Runner already downloaded"
fi

# Create service file
echo "🔧 Creating systemd service"
cat > /etc/systemd/system/github-runner.service << EOF
[Unit]
Description=GitHub Actions Runner
After=network.target

[Service]
Type=simple
User=$RUNNER_USER
WorkingDirectory=$RUNNER_DIR
ExecStart=$RUNNER_DIR/run.sh
Restart=always
RestartSec=5
Environment=KUBECONFIG=/etc/rancher/k3s/k3s.yaml
Environment=PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable github-runner

echo ""
echo "✅ GitHub Actions Runner setup complete!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/YOUR_REPO"
echo "2. Navigate to Settings → Actions → Runners"
echo "3. Click 'New self-hosted runner'"
echo "4. Copy the configuration command and run it as the runner user:"
echo ""
echo "   sudo -u $RUNNER_USER -i"
echo "   cd $RUNNER_DIR"
echo "   ./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN"
echo ""
echo "5. Start the runner service:"
echo "   systemctl start github-runner"
echo ""
echo "6. Check runner status:"
echo "   systemctl status github-runner"
echo ""
echo "🔗 GitHub Runner Documentation: https://docs.github.com/en/actions/hosting-your-own-runners"