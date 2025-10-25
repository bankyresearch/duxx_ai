# Creating a New Private Repository for DuxxAI Code

This guide walks you through creating a new private repository and migrating your DuxxAI Code project.

---

## 🎯 Why Create a New Private Repository?

**Benefits:**
- ✅ **Clean branding** - No "claude/" branch naming restrictions
- ✅ **Privacy** - Keep your code private
- ✅ **Full control** - Manage branches, releases, and access
- ✅ **Fresh start** - Clean commit history (optional)
- ✅ **Proper naming** - Use `main` or `duxxai/*` branch names

---

## 📋 Three Migration Options

### **Option 1: Quick Migration (Keep All History)** ⚡
**Best for:** Preserving all commits and history
**Time:** 5 minutes

### **Option 2: Fresh Start (Clean History)** 🆕
**Best for:** Starting fresh with clean commits
**Time:** 10 minutes

### **Option 3: Selective History** 🎯
**Best for:** Keeping some history, cleaning others
**Time:** 15 minutes

---

## 🚀 Option 1: Quick Migration (Recommended)

### Step 1: Create New Private Repository on GitHub

**Via Website:**
1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `duxxai-code`
   - **Description**: "DuxxAI Code - AI-Powered Development Environment"
   - **Visibility**: ✅ **Private**
   - **DO NOT** check "Initialize with README"
3. Click **"Create repository"**

**Via GitHub CLI (faster):**
```bash
gh repo create duxxai-code \
  --private \
  --description "DuxxAI Code - AI-Powered Development Environment with Specialized AI Agents" \
  --clone=false
```

### Step 2: Update Remote and Push

```bash
# Navigate to your project
cd /home/user/duxx_ai

# Add new repository as remote
git remote add private https://github.com/YOUR_USERNAME/duxxai-code.git

# Create clean main branch
git checkout claude/enhance-debugging-tool-011CUTpz1wfpXG38mqxQPbdQ
git checkout -b main

# Push to new repository
git push -u private main

# Verify
git remote -v
```

### Step 3: Update Repository URLs

```bash
# Run the URL update script
./update-repository-urls.sh

# When prompted, enter: YOUR_USERNAME/duxxai-code

# Review changes
git diff

# Commit
git add -A
git commit -m "Update repository URLs to new private repository"

# Push
git push private main
```

### Step 4: Make New Repository Your Default (Optional)

```bash
# Rename remotes
git remote rename origin old-origin
git remote rename private origin

# Verify
git remote -v
# Should show:
# origin    https://github.com/YOUR_USERNAME/duxxai-code.git (fetch)
# origin    https://github.com/YOUR_USERNAME/duxxai-code.git (push)
```

---

## 🆕 Option 2: Fresh Start (Clean History)

### Step 1: Create New Private Repository
(Same as Option 1, Step 1)

### Step 2: Create Fresh Repository

```bash
# Create new directory
cd /home/user
mkdir duxxai-code-fresh
cd duxxai-code-fresh

# Initialize git
git init
git checkout -b main

# Copy files from old repository
cp -r ../duxx_ai/.github .
cp -r ../duxx_ai/src .
cp -r ../duxx_ai/build .
cp ../duxx_ai/product.json .
cp ../duxx_ai/package.json .
cp ../duxx_ai/*.md .
cp ../duxx_ai/*.html .
cp ../duxx_ai/*.sh .
cp ../duxx_ai/.gitignore .
cp ../duxx_ai/.gitattributes .

# Make scripts executable
chmod +x *.sh

# Update repository URLs
./update-repository-urls.sh
# Enter: YOUR_USERNAME/duxxai-code

# Stage all files
git add -A

# Create initial commit
git commit -m "Initial release: DuxxAI Code v1.0.0

Complete AI-powered development environment featuring:

✨ Six Specialized AI Agents:
- Debug Assistant - Expert debugging and error analysis
- Code Reviewer - Code quality and best practices
- Standards Checker - Industry standards compliance
- Security Scanner - Vulnerability detection
- Code Assistant - General coding help
- General Assistant - Multi-purpose support

🔥 Fireworks.ai Integration:
- Llama 3.1 (70B and 405B models)
- Mixtral 8x7B
- Qwen 2.5 72B

📦 Cross-Platform Distribution:
- Windows (NSIS installer)
- macOS (Universal DMG)
- Linux (AppImage, .deb, .rpm)

🔄 Features:
- Auto-update system
- Professional installers
- Complete documentation
- Build automation
- Landing page

Built on VS Code platform with enhanced AI capabilities.

🤖 Created by the DuxxAI Team"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/duxxai-code.git

# Push
git push -u origin main
```

---

## 🎯 Option 3: Selective History

### Step 1: Create New Private Repository
(Same as Option 1, Step 1)

### Step 2: Cherry-pick Important Commits

```bash
cd /home/user/duxx_ai

# Create main branch
git checkout -b main

# Reset to initial state
git reset --hard <first_commit_hash>

# Cherry-pick important commits
git cherry-pick 749ef57b  # Agentic AI system
git cherry-pick f6e224c8  # Standalone application
git cherry-pick 22bd2013  # Transformation summary
git cherry-pick 09a61ba5  # DuxxAI rebranding

# Update repository URLs
./update-repository-urls.sh

# Commit URL updates
git add -A
git commit -m "Update repository URLs"

# Add remote and push
git remote add private https://github.com/YOUR_USERNAME/duxxai-code.git
git push -u private main
```

---

## 📦 After Migration Checklist

### ✅ Repository Settings

1. **Configure Repository Settings:**
   - Go to `Settings` → `General`
   - Set default branch to `main`
   - Enable/disable features as needed

2. **Set Up Branch Protection:**
   ```
   Settings → Branches → Add rule
   - Branch name pattern: main
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   ```

3. **Configure Collaborators (if needed):**
   ```
   Settings → Collaborators → Add people
   ```

### ✅ Update Local Configuration

```bash
# Update git config
git config user.name "DuxxAI Team"
git config user.email "support@duxxai.com"

# Verify remotes
git remote -v
```

### ✅ Verify All URLs Updated

Check these files have correct repository URLs:
- [ ] `product.json`
- [ ] `README_STANDALONE.md`
- [ ] `BUILD_AND_DISTRIBUTE.md`
- [ ] `LANDING_PAGE.html`
- [ ] `AGENTIC_CHAT_SYSTEM.md`
- [ ] `QUICKSTART_AGENTS.md`
- [ ] `COMPLETE_TRANSFORMATION_SUMMARY.md`
- [ ] `build/package.json`

```bash
# Quick check
grep -r "bankyresearch/duxx_ai" . --exclude-dir=.git --exclude-dir=node_modules
# Should return no results
```

---

## 🔐 Repository Security Settings

### Recommended Settings

```bash
# 1. Enable security features
Settings → Security & Analysis
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates

# 2. Set up secrets (for CI/CD)
Settings → Secrets and variables → Actions
- Add: FIREWORKS_API_KEY (if using in tests)
- Add: NPM_TOKEN (if publishing)
```

---

## 🏷️ Create First Release

After migration, create your first release:

```bash
# Build all platforms
./build-and-package.sh --all

# Create release
git tag v1.0.0
git push origin v1.0.0

# Create GitHub release
gh release create v1.0.0 dist/* \
  --title "DuxxAI Code v1.0.0" \
  --notes "First official release of DuxxAI Code

## Features
- 6 specialized AI agents
- Fireworks.ai integration
- Cross-platform installers
- Auto-updates
- Complete documentation

## Downloads
- Windows: DuxxAI-Code-1.0.0-x64.exe
- macOS: DuxxAI-Code-1.0.0-universal.dmg
- Linux: DuxxAI-Code-1.0.0-x64.AppImage

## Installation
See README_STANDALONE.md for installation instructions.
"
```

---

## 📋 Migration Verification Checklist

After migration, verify everything works:

### Code & Build
- [ ] Repository is private
- [ ] `main` branch is default
- [ ] All files are present
- [ ] Build script works: `./build-and-package.sh`
- [ ] No build errors

### Documentation
- [ ] All URLs point to new repository
- [ ] README renders correctly
- [ ] Landing page has correct download links
- [ ] No references to old repository

### Git Configuration
- [ ] Remote is set correctly
- [ ] Can push to new repository
- [ ] Branch protection configured
- [ ] Collaborators added (if needed)

### Release
- [ ] Can create tags
- [ ] Can create releases
- [ ] Installers upload correctly
- [ ] Download links work

---

## 🔄 Update Old Repository (Optional)

If you want to keep the old repository but redirect users:

### Option A: Archive Old Repository
```
Old Repository → Settings → General → Archive this repository
```

### Option B: Add Redirect Notice
Update the old repository's README:

```markdown
# ⚠️ This Repository Has Moved

**DuxxAI Code** is now maintained at:
https://github.com/YOUR_USERNAME/duxxai-code

Please use the new repository for:
- Latest releases
- Issues and discussions
- Contributions

This repository is kept for historical purposes only.
```

---

## 🆘 Troubleshooting

### Problem: Push Fails with 403 Error

**Solution:**
```bash
# Use personal access token
gh auth login
# Or use SSH
git remote set-url origin git@github.com:YOUR_USERNAME/duxxai-code.git
```

### Problem: Files Missing After Migration

**Solution:**
```bash
# Copy hidden files
cp -r ../duxx_ai/.[^.]* .

# Copy specific files
cp ../duxx_ai/.gitignore .
cp ../duxx_ai/.gitattributes .
```

### Problem: Large Repository Size

**Solution:**
```bash
# Clean git history
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Or use BFG Repo Cleaner for large files
```

---

## 📊 Quick Command Reference

```bash
# Create new private repo
gh repo create duxxai-code --private

# Clone and setup
git clone https://github.com/YOUR_USERNAME/duxxai-code.git
cd duxxai-code

# Copy files from old repo
cp -r /home/user/duxx_ai/* .
cp /home/user/duxx_ai/.* . 2>/dev/null

# Update URLs
./update-repository-urls.sh

# Commit and push
git add -A
git commit -m "Initial commit: DuxxAI Code v1.0.0"
git push -u origin main

# Create release
git tag v1.0.0
git push origin v1.0.0
gh release create v1.0.0
```

---

## ✅ Success!

You now have:
- ✅ Private repository for DuxxAI Code
- ✅ Clean branch naming (no "claude/" restrictions)
- ✅ Updated documentation
- ✅ Ready for releases

**Next Steps:**
1. Build the application: `./build-and-package.sh --all`
2. Create first release: `gh release create v1.0.0 dist/*`
3. Share with users!

---

**Need Help?**
- GitHub Docs: https://docs.github.com/en/repositories
- Git Documentation: https://git-scm.com/doc

---

**Made with ❤️ by the DuxxAI Team**
