#!/bin/bash
set -euo pipefail

# Synchronize versions across all packages
# Usage: ./version-sync.sh <version>

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 1.2.3"
  exit 1
fi

VERSION=$1

# Validate version format
if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$ ]]; then
  echo "Error: Invalid version format. Use semantic versioning (e.g., 1.2.3 or 1.2.3-beta.1)"
  exit 1
fi

echo "Synchronizing all packages to version $VERSION..."

# Update root package.json
if [ -f "package.json" ]; then
  echo "Updating root package.json..."
  jq --arg v "$VERSION" '.version = $v' package.json > package.json.tmp
  mv package.json.tmp package.json
fi

# Update all package versions
for package_json in lib/*/package.json; do
  if [ -f "$package_json" ]; then
    echo "Updating $package_json..."
    
    # Update version
    jq --arg v "$VERSION" '.version = $v' "$package_json" > "$package_json.tmp"
    
    # Update dependencies to workspace packages
    jq --arg v "$VERSION" '
      if .dependencies."@sammons/typed-mind" then
        .dependencies."@sammons/typed-mind" = $v
      else . end |
      if .dependencies."@sammons/typed-mind-renderer" then
        .dependencies."@sammons/typed-mind-renderer" = $v
      else . end |
      if .dependencies."@sammons/typed-mind-cli" then
        .dependencies."@sammons/typed-mind-cli" = $v
      else . end |
      if .dependencies."@sammons/typed-mind-lsp" then
        .dependencies."@sammons/typed-mind-lsp" = $v
      else . end
    ' "$package_json.tmp" > "$package_json"
    
    rm "$package_json.tmp"
  fi
done

# Update VS Code extension manifest
if [ -f "lib/typed-mind-vscode-extension/package.json" ]; then
  echo "Updating VS Code extension manifest..."
  jq --arg v "$VERSION" '.version = $v' lib/typed-mind-vscode-extension/package.json > lib/typed-mind-vscode-extension/package.json.tmp
  mv lib/typed-mind-vscode-extension/package.json.tmp lib/typed-mind-vscode-extension/package.json
fi

echo "Version synchronization complete!"
echo "All packages updated to version $VERSION"