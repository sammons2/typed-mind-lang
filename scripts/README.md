# TypedMind Scripts

This directory contains utility scripts for managing the TypedMind monorepo.

## VSCode Extension Publishing

### update-vsce-token.sh
Updates the VSCE_PAT (Personal Access Token) secret used for publishing the VSCode extension to the marketplace.

**Usage:**
```bash
./scripts/update-vsce-token.sh
```

This script will:
1. Guide you through generating a PAT from Azure DevOps
2. Prompt you for the token (input is hidden)
3. Save it as a GitHub secret using the `gh` CLI
4. The secret will be available to GitHub Actions workflows

**Requirements:**
- GitHub CLI (`gh`) must be installed and authenticated
- You need write access to the repository secrets
- You need a VSCode Marketplace publisher account

### verify-vsce-token.sh
Verifies that the VSCE_PAT secret is properly configured.

**Usage:**
```bash
./scripts/verify-vsce-token.sh
```

This script will:
1. Check if the VSCE_PAT secret exists in the repository
2. Provide commands to test the token via GitHub Actions
3. Show you how to manually publish if needed

## Token Generation Guide

To generate a Personal Access Token for VSCode Marketplace:

1. Go to https://dev.azure.com
2. Click on your profile icon → Personal access tokens
3. Click "New Token"
4. Configure the token:
   - **Name:** vsce-publish (or any descriptive name)
   - **Organization:** All accessible organizations
   - **Expiration:** 90 days (or custom)
   - **Scopes:**
     - Marketplace → Acquire
     - Marketplace → Publish
     - Marketplace → Manage
5. Click "Create" and copy the token immediately (it won't be shown again)

## Publishing the Extension

After setting up the token:

```bash
# Trigger the publish workflow
gh workflow run vscode-publish.yml

# Check the status
gh run list --workflow=vscode-publish.yml --limit=1

# View detailed logs if needed
gh run view <run-id> --log
```

The extension will be published to:
https://marketplace.visualstudio.com/items?itemName=sammons.typed-mind