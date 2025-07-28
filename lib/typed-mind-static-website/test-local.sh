#!/bin/bash

echo "Building TypedMind static website..."
npm run build

echo ""
echo "Starting local server..."
echo "Website will be available at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev