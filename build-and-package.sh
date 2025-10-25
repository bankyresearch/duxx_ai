#!/bin/bash

###############################################################################
# DuxxAI Code - Build and Package Script
# This script builds DuxxAI Code for all platforms and creates installers
###############################################################################

set -e

echo "======================================"
echo "  DuxxAI Code - Build & Package"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VERSION="1.0.0"
PRODUCT_NAME="DuxxAI Code"

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi
print_success "Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi
print_success "npm found: $(npm --version)"

# Install dependencies
print_info "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Clean previous builds
print_info "Cleaning previous builds..."
npm run clean 2>/dev/null || true
rm -rf dist/ out/ 2>/dev/null || true
print_success "Clean complete"

# Compile
print_info "Compiling TypeScript and resources..."
npm run compile
print_success "Compilation complete"

# Build
print_info "Building $PRODUCT_NAME..."
npm run build
print_success "Build complete"

# Package
echo ""
print_info "Creating installers for all platforms..."
echo ""

# Windows
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    print_info "Creating Windows installer..."
    npm run package:win
    print_success "Windows installer created"
fi

# macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    print_info "Creating macOS installer..."
    npm run package:mac
    print_success "macOS installer created"
fi

# Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    print_info "Creating Linux packages..."
    npm run package:linux
    print_success "Linux packages created"
fi

# Create all if requested
if [ "$1" == "--all" ]; then
    print_info "Creating installers for all platforms..."
    npm run package:all
    print_success "All installers created"
fi

# Generate checksums
if [ -d "dist" ]; then
    print_info "Generating checksums..."
    cd dist
    sha256sum *.* > SHA256SUMS.txt 2>/dev/null || shasum -a 256 *.* > SHA256SUMS.txt
    cd ..
    print_success "Checksums generated"
fi

# Summary
echo ""
echo "======================================"
echo "  Build Summary"
echo "======================================"
echo ""
echo "Product: $PRODUCT_NAME"
echo "Version: $VERSION"
echo "Build Date: $(date)"
echo ""

if [ -d "dist" ]; then
    echo "Installers created:"
    ls -lh dist/ | grep -v "^d" | awk '{print "  " $9 " (" $5 ")"}'
    echo ""
fi

print_success "Build and package complete!"
echo ""
echo "Next steps:"
echo "  1. Test installers on each platform"
echo "  2. Create GitHub release: gh release create v$VERSION dist/*"
echo "  3. Update download page with new version"
echo ""
