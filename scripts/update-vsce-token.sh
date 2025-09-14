#!/bin/bash

# Script to update VSCE_PAT secret for VSCode extension publishing
# This secret is used by the vscode-publish.yml workflow

set -e

echo "================================================"
echo "VSCode Extension Publishing Token Setup"
echo "================================================"
echo ""
echo "This script will help you set up the Personal Access Token (PAT)"
echo "required to publish the TypedMind VSCode extension to the marketplace."
echo ""
echo "Prerequisites:"
echo "1. You need a VSCode Marketplace publisher account"
echo "2. You need to generate a PAT from: https://dev.azure.com"
echo ""
echo "To generate a PAT:"
echo "1. Go to https://dev.azure.com"
echo "2. Click on your profile icon > Personal access tokens"
echo "3. Click 'New Token'"
echo "4. Name: 'vsce-publish' (or similar)"
echo "5. Organization: Select 'All accessible organizations'"
echo "6. Expiration: Set as needed (recommend 90 days or custom)"
echo "7. Scopes: Click 'Show all scopes' and select:"
echo "   - Marketplace > Acquire"
echo "   - Marketplace > Publish"
echo "   - Marketplace > Manage"
echo "8. Click 'Create' and copy the token immediately"
echo ""
echo "Press Enter to continue..."
read

# Check if gh CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "Error: GitHub CLI is not authenticated"
    echo "Please run: gh auth login"
    exit 1
fi

# Get the repository (supports both SSH and HTTPS remotes)
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")
if [ -z "$REPO" ]; then
    echo "Error: Could not determine repository. Make sure you're in a git repository."
    exit 1
fi

echo "Repository detected: $REPO"
echo ""

# Prompt for the token
echo "Please paste your VSCode Marketplace PAT (input will be hidden):"
read -s VSCE_PAT
echo ""

# Validate the token is not empty
if [ -z "$VSCE_PAT" ]; then
    echo "Error: Token cannot be empty"
    exit 1
fi

# Check if secret already exists
echo "Checking if VSCE_PAT secret exists..."
if gh secret list -R "$REPO" | grep -q "^VSCE_PAT"; then
    echo "VSCE_PAT secret already exists."
    echo "Do you want to update it? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

# Set the secret
echo "Setting VSCE_PAT secret for repository $REPO..."
echo "$VSCE_PAT" | gh secret set VSCE_PAT -R "$REPO"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! VSCE_PAT secret has been set."
    echo ""
    echo "Next steps:"
    echo "1. The secret is now available to GitHub Actions workflows"
    echo "2. Run the VSCode publish workflow:"
    echo "   gh workflow run vscode-publish.yml"
    echo "3. Check the workflow status:"
    echo "   gh run list --workflow=vscode-publish.yml --limit=1"
    echo ""
    echo "The extension should publish to:"
    echo "https://marketplace.visualstudio.com/items?itemName=sammons.typed-mind"
else
    echo ""
    echo "❌ Failed to set secret. Please check your permissions and try again."
    exit 1
fi