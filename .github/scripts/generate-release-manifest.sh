#!/bin/bash
set -euo pipefail

# Generate a release manifest JSON file
# Usage: ./generate-release-manifest.sh <version>

VERSION=${1:-$(jq -r '.version' package.json)}
MANIFEST_FILE="release-artifacts/manifest.json"

echo "Generating release manifest for version $VERSION..."

# Start building the manifest
cat > "$MANIFEST_FILE" << EOF
{
  "version": "$VERSION",
  "date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "artifacts": {
    "npm": {
      "@sammons/typed-mind": {
        "version": "$VERSION",
        "registry": "https://registry.npmjs.org/@sammons/typed-mind"
      },
      "@sammons/typed-mind-cli": {
        "version": "$VERSION",
        "registry": "https://registry.npmjs.org/@sammons/typed-mind-cli"
      },
      "@sammons/typed-mind-renderer": {
        "version": "$VERSION",
        "registry": "https://registry.npmjs.org/@sammons/typed-mind-renderer"
      },
      "@sammons/typed-mind-lsp": {
        "version": "$VERSION",
        "registry": "https://registry.npmjs.org/@sammons/typed-mind-lsp"
      }
    },
    "vscode": {
      "id": "sammons.typed-mind",
      "version": "$VERSION",
      "marketplace": "https://marketplace.visualstudio.com/items?itemName=sammons.typed-mind",
      "vsix": "typed-mind-$VERSION.vsix"
    },
    "downloads": [
EOF

# Add each artifact to the manifest
FIRST=true
for file in release-artifacts/*; do
  if [ -f "$file" ] && [ "$(basename "$file")" != "manifest.json" ]; then
    FILENAME=$(basename "$file")
    SIZE=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo "0")
    SHA256=$(sha256sum "$file" | cut -d' ' -f1)
    
    if [ "$FIRST" = false ]; then
      echo "," >> "$MANIFEST_FILE"
    fi
    FIRST=false
    
    cat >> "$MANIFEST_FILE" << EOF
      {
        "filename": "$FILENAME",
        "size": $SIZE,
        "sha256": "$SHA256"
      }
EOF
  fi
done

# Complete the manifest
cat >> "$MANIFEST_FILE" << EOF

    ]
  }
}
EOF

echo "Manifest generated at $MANIFEST_FILE"
jq . "$MANIFEST_FILE"