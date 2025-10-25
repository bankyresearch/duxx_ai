# Building and Distributing DuxxAI Code

This guide explains how to build and distribute **DuxxAI Code** as a standalone application that users can download and install, similar to Cursor, VSCodium, or other code editors.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Creating Installers](#creating-installers)
4. [Distribution Methods](#distribution-methods)
5. [Auto-Updates](#auto-updates)
6. [Branding](#branding)
7. [Release Workflow](#release-workflow)

---

## 🔧 Prerequisites

### System Requirements

**For Building:**
- Node.js 18.x or later
- Python 3.x
- Git
- 20+ GB free disk space
- 16+ GB RAM recommended

**Platform-Specific:**
- **Windows**: Visual Studio Build Tools 2019+
- **macOS**: Xcode Command Line Tools
- **Linux**: build-essential, libx11-dev, libxkbfile-dev, libsecret-1-dev

### Install Dependencies

```bash
# Clone the repository
git clone https://github.com/bankyresearch/duxx_ai.git
cd duxx_ai

# Install dependencies
npm install
```

---

## 🏗️ Build Process

### 1. Configure Product Identity

The product configuration is in `product.json`:

```json
{
  "nameShort": "DuxxAI",
  "nameLong": "DuxxAI Code",
  "applicationName": "duxxai",
  "version": "1.0.0",
  ...
}
```

### 2. Build for Your Platform

```bash
# Build for current platform
npm run build

# Platform-specific builds
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

### 3. Compile TypeScript and Resources

```bash
# Full compilation
npm run compile

# Watch mode for development
npm run watch
```

---

## 📦 Creating Installers

### Windows Installer (.exe)

```bash
# Build Windows installer
npm run package:win

# Output: dist/DuxxAI-Code-1.0.0-x64.exe
#         dist/DuxxAI-Code-1.0.0-arm64.exe
```

**Features:**
- NSIS installer with custom branding
- Desktop and Start Menu shortcuts
- File associations for code files
- Uninstaller included
- Per-user or system-wide installation

### macOS Application (.dmg)

```bash
# Build macOS DMG
npm run package:mac

# Output: dist/DuxxAI-Code-1.0.0-universal.dmg
#         dist/DuxxAI-Code-1.0.0-x64.dmg
#         dist/DuxxAI-Code-1.0.0-arm64.dmg
```

**Features:**
- Universal binary (Intel + Apple Silicon)
- Code-signed and notarized (with Apple Developer account)
- Drag-and-drop installation
- macOS Gatekeeper compatible

### Linux Packages

```bash
# Build all Linux packages
npm run package:linux

# Output: dist/DuxxAI-Code-1.0.0-x64.AppImage  # Universal Linux
#         dist/DuxxAI-Code-1.0.0-amd64.deb     # Debian/Ubuntu
#         dist/DuxxAI-Code-1.0.0-x86_64.rpm    # Fedora/RHEL
#         dist/DuxxAI-Code-1.0.0-x64.tar.gz    # Portable
```

**Features:**
- AppImage: Portable, no installation required
- .deb: For Debian-based distributions
- .rpm: For Red Hat-based distributions
- Desktop integration and file associations

### Build All Platforms

```bash
# Build installers for all platforms
npm run package:all

# This creates:
# - Windows: .exe installer
# - macOS: .dmg installer
# - Linux: .AppImage, .deb, .rpm, .tar.gz
```

---

## 🌐 Distribution Methods

### Method 1: GitHub Releases (Recommended for Open Source)

1. **Create a GitHub Release:**

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Build all packages
npm run dist

# Upload to GitHub Releases
gh release create v1.0.0 \
  dist/DuxxAI-Code-1.0.0-*.* \
  --title "DuxxAI Code v1.0.0" \
  --notes "First stable release"
```

2. **Users Download:**
   - Go to: https://github.com/bankyresearch/duxx_ai/releases
   - Download the appropriate installer for their platform
   - Run the installer

### Method 2: Custom Download Server

**Setup:**

```bash
# Create download server (Node.js/Express example)
mkdir download-server
cd download-server
npm init -y
npm install express

# Create server.js
cat > server.js << 'EOF'
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/download/latest/:platform', (req, res) => {
  const { platform } = req.params;
  const files = {
    'windows': 'DuxxAI-Code-1.0.0-x64.exe',
    'mac': 'DuxxAI-Code-1.0.0-universal.dmg',
    'linux': 'DuxxAI-Code-1.0.0-x64.AppImage'
  };
  res.download(`./releases/${files[platform]}`);
});

app.listen(3000, () => {
  console.log('Download server running on http://localhost:3000');
});
EOF

# Run the server
node server.js
```

**Website Integration:**

```html
<!-- download.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Download DuxxAI Code</title>
</head>
<body>
  <h1>Download DuxxAI Code</h1>
  <div class="download-buttons">
    <a href="/download/latest/windows">Download for Windows</a>
    <a href="/download/latest/mac">Download for macOS</a>
    <a href="/download/latest/linux">Download for Linux</a>
  </div>
</body>
</html>
```

### Method 3: Package Managers

**Windows (Chocolatey):**

```powershell
# Install Chocolatey package
choco install duxxai-code
```

**macOS (Homebrew):**

```bash
# Install via Homebrew
brew install --cask duxxai-code
```

**Linux (Snapcraft):**

```bash
# Install via Snap
sudo snap install duxxai-code
```

---

## 🔄 Auto-Updates

### Electron Auto-Updater Setup

1. **Configure update URL in `product.json`:**

```json
{
  "updateUrl": "https://duxxai.com/api/update",
  "releaseNotesUrl": "https://duxxai.com/updates"
}
```

2. **Create Update Server:**

```javascript
// update-server.js
const express = require('express');
const app = express();

app.get('/api/update/:platform/:version', (req, res) => {
  const { platform, version } = req.params;
  const latestVersion = '1.0.1';

  if (version < latestVersion) {
    res.json({
      url: `https://duxxai.com/releases/DuxxAI-Code-${latestVersion}-${platform}`,
      name: `DuxxAI Code ${latestVersion}`,
      notes: 'Bug fixes and improvements',
      releaseDate: new Date().toISOString()
    });
  } else {
    res.status(204).send();
  }
});

app.listen(3000);
```

3. **Application Checks for Updates:**

The app automatically checks for updates on startup and notifies users when a new version is available.

---

## 🎨 Branding

### Custom Icons

**Required Icon Files:**

```
build/resources/
├── icon.icns         # macOS (512x512, 256x256, 128x128, etc.)
├── icon.ico          # Windows (256x256, 128x128, 64x64, 32x32, 16x16)
└── icon.png          # Linux (512x512)
```

**Create Icons:**

```bash
# From a single PNG (512x512 or larger)
npm install -g icon-gen

# Generate all icon formats
icon-gen -i icon-source.png -o build/resources
```

### Splash Screen

Create `build/resources/splash.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #1e1e1e;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .splash {
      text-align: center;
    }
    .logo {
      width: 128px;
      height: 128px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="splash">
    <img src="icon.png" class="logo" alt="DuxxAI Code">
    <h1>DuxxAI Code</h1>
    <p>AI-Powered Development Environment</p>
    <div class="spinner"></div>
  </div>
</body>
</html>
```

### Custom Themes

**Built-in Theme:**

```json
// themes/duxxai-dark.json
{
  "name": "DuxxAI Dark",
  "type": "dark",
  "colors": {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "activityBar.background": "#181818",
    "sideBar.background": "#1e1e1e",
    "statusBar.background": "#007acc",
    "statusBar.noFolderBackground": "#007acc"
  }
}
```

---

## 🚀 Release Workflow

### Complete Release Process

```bash
#!/bin/bash
# release.sh - Complete release script

VERSION="1.0.0"

echo "Starting release process for v$VERSION..."

# 1. Update version
npm version $VERSION --no-git-tag-version

# 2. Update product.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" product.json

# 3. Clean previous builds
npm run clean

# 4. Install dependencies
npm install

# 5. Run tests
npm test

# 6. Build all platforms
echo "Building for all platforms..."
npm run build

# 7. Create installers
echo "Creating installers..."
npm run package:all

# 8. Code sign (if configured)
if [ -f "scripts/codesign.sh" ]; then
  echo "Code signing..."
  ./scripts/codesign.sh
fi

# 9. Create checksums
echo "Generating checksums..."
cd dist
sha256sum *.* > SHA256SUMS.txt
cd ..

# 10. Create git tag
git add .
git commit -m "Release v$VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"

# 11. Push to GitHub
git push origin main
git push origin "v$VERSION"

# 12. Create GitHub release
gh release create "v$VERSION" \
  dist/*.* \
  --title "DuxxAI Code v$VERSION" \
  --notes-file CHANGELOG.md

# 13. Update website
echo "Updating website..."
./scripts/update-website.sh $VERSION

echo "Release v$VERSION complete!"
echo "Download page: https://duxxai.com/download"
```

### Continuous Integration (GitHub Actions)

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Package
        run: npm run package

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: installers-${{ matrix.os }}
          path: dist/*

  release:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            installers-*/*
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📊 Analytics and Telemetry

### Basic Telemetry

```typescript
// src/telemetry.ts
export class TelemetryService {
  async sendEvent(event: string, properties: any) {
    if (!this.isTelemetryEnabled()) return;

    await fetch('https://duxxai.com/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        properties,
        timestamp: new Date().toISOString(),
        version: app.getVersion()
      })
    });
  }

  private isTelemetryEnabled(): boolean {
    return getConfiguration('telemetry.enabled', true);
  }
}
```

---

## 🔐 Code Signing

### Windows Code Signing

```bash
# Sign with signtool (requires certificate)
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com /fd SHA256 DuxxAI-Code.exe
```

### macOS Code Signing

```bash
# Sign and notarize
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" DuxxAI.app

# Notarize
xcrun notarytool submit DuxxAI.dmg --apple-id email@example.com --team-id TEAMID --password app-specific-password
```

---

## 📱 Distribution Checklist

Before releasing:

- [ ] Update version in `product.json` and `package.json`
- [ ] Run all tests (`npm test`)
- [ ] Build for all platforms
- [ ] Test installers on each platform
- [ ] Code sign binaries
- [ ] Generate checksums
- [ ] Update CHANGELOG.md
- [ ] Create release notes
- [ ] Upload to GitHub Releases
- [ ] Update website download links
- [ ] Announce on social media
- [ ] Monitor crash reports and feedback

---

## 🌐 Download Page Example

See `LANDING_PAGE.html` for a complete download page template.

---

## 💡 Tips and Best Practices

1. **Version Numbering**: Use Semantic Versioning (SemVer): MAJOR.MINOR.PATCH
2. **Beta Testing**: Release to beta testers before public release
3. **Crash Reporting**: Integrate crash reporting (Sentry, Bugsnag)
4. **Analytics**: Track usage to improve the product
5. **Auto-Updates**: Keep users on the latest version automatically
6. **Changelogs**: Maintain detailed changelogs for each release
7. **Documentation**: Keep docs up-to-date with each release

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clean everything and rebuild
npm run clean
rm -rf node_modules
npm install
npm run build
```

### Installer Won't Run

- **Windows**: Check code signing certificate
- **macOS**: Ensure app is notarized
- **Linux**: Check execute permissions

### Large Bundle Size

```bash
# Analyze bundle
npm run build -- --analyze

# Optimize node_modules
npm prune --production
```

---

## 📚 Resources

- [Electron Builder Docs](https://www.electron.build/)
- [Code Signing Guide](https://www.electron.build/code-signing)
- [Auto-Update Guide](https://www.electron.build/auto-update)
- [VS Code Build Guide](https://github.com/microsoft/vscode/wiki/How-to-Contribute#build-and-run)

---

**Ready to release DuxxAI Code to the world!** 🚀

For questions or issues, visit: https://github.com/bankyresearch/duxx_ai/issues
