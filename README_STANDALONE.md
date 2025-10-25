# DuxxAI Code - Standalone Application

<div align="center">

![DuxxAI Code](https://img.shields.io/badge/DuxxAI-Code-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**AI-Powered Development Environment with Specialized Agents**

[Download](#-download) • [Features](#-features) • [Documentation](#-documentation) • [Build](#-building-from-source)

</div>

---

## 🚀 What is DuxxAI Code?

**DuxxAI Code** is a complete, standalone code editor powered by advanced AI agents. Built on Visual Studio Code, it extends the platform with specialized AI agents for debugging, code review, security scanning, and more.

**Key Differentiators:**
- ✅ **Standalone Application** - Download and run like Cursor, VSCodium, or Atom
- ✅ **6 Specialized AI Agents** - Debugging, Code Review, Security, Standards, and more
- ✅ **Fireworks.ai Integration** - State-of-the-art LLMs (Llama 3.1, Mixtral, Qwen)
- ✅ **100% Open Source** - MIT Licensed, fully transparent
- ✅ **Cross-Platform** - Windows, macOS, Linux

---

## 📥 Download

### Latest Release: v1.0.0

<table>
<tr>
<td align="center">
<h3>🪟 Windows</h3>
<a href="https://github.com/bankyresearch/duxx_ai/releases/latest/download/DuxxAI-Code-1.0.0-x64.exe">
<img src="https://img.shields.io/badge/Download-Windows%2010/11-0078D4?style=for-the-badge&logo=windows" alt="Download for Windows">
</a>
<br>
<small>Installer (64-bit)</small>
</td>
<td align="center">
<h3>🍎 macOS</h3>
<a href="https://github.com/bankyresearch/duxx_ai/releases/latest/download/DuxxAI-Code-1.0.0-universal.dmg">
<img src="https://img.shields.io/badge/Download-macOS-000000?style=for-the-badge&logo=apple" alt="Download for macOS">
</a>
<br>
<small>Universal (Intel + Apple Silicon)</small>
</td>
<td align="center">
<h3>🐧 Linux</h3>
<a href="https://github.com/bankyresearch/duxx_ai/releases/latest">
<img src="https://img.shields.io/badge/Download-Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Download for Linux">
</a>
<br>
<small>.deb / .rpm / AppImage</small>
</td>
</tr>
</table>

### Installation

**Windows:**
```powershell
# Run the installer
DuxxAI-Code-1.0.0-x64.exe

# Or install via Chocolatey (coming soon)
choco install duxxai-code
```

**macOS:**
```bash
# Mount the DMG and drag to Applications
open DuxxAI-Code-1.0.0-universal.dmg

# Or install via Homebrew (coming soon)
brew install --cask duxxai-code
```

**Linux:**
```bash
# AppImage (portable)
chmod +x DuxxAI-Code-1.0.0-x64.AppImage
./DuxxAI-Code-1.0.0-x64.AppImage

# Debian/Ubuntu
sudo dpkg -i DuxxAI-Code-1.0.0-amd64.deb

# Fedora/RHEL
sudo rpm -i DuxxAI-Code-1.0.0-x86_64.rpm

# Snap (coming soon)
sudo snap install duxxai-code
```

---

## ✨ Features

### 🤖 Six Specialized AI Agents

<table>
<tr>
<td width="50%">

**🐛 Debug Assistant**
- Find and fix bugs efficiently
- Analyze error messages and stack traces
- Suggest debugging strategies
- Provide step-by-step guidance

**✅ Code Reviewer**
- Review code quality and maintainability
- Identify anti-patterns and code smells
- Suggest refactoring opportunities
- Evaluate performance implications

**✓ Standards Checker**
- Ensure industry standards compliance
- Check coding conventions (PEP 8, PSR, etc.)
- Validate SOLID principles
- Review accessibility standards (WCAG)

</td>
<td width="50%">

**🛡️ Security Scanner**
- Identify security vulnerabilities
- Detect XSS, SQL injection, CSRF risks
- Check for exposed secrets
- Validate authentication logic

**💡 Code Assistant**
- General coding help and suggestions
- Provide code examples and templates
- Explain complex concepts
- Assist with API usage

**💬 General Assistant**
- Multi-purpose development help
- Answer technical questions
- Provide learning resources
- Support all programming languages

</td>
</tr>
</table>

### 🔥 Fireworks.ai Integration

**Powered by State-of-the-Art Models:**
- **Llama 3.1 70B** - Balanced performance and speed (default)
- **Llama 3.1 405B** - Highest capability for complex tasks
- **Mixtral 8x7B** - Fast mixture of experts model
- **Qwen 2.5 72B** - Excellent for code generation

**Advanced Capabilities:**
- Context-aware responses (up to 131K tokens)
- Multi-turn conversations with memory
- Code generation and completion
- Natural language to code translation

---

## 🎯 Quick Start

### 1. Install DuxxAI Code
Download and install for your platform (see [Download](#-download) section).

### 2. Get Fireworks.ai API Key
1. Visit [fireworks.ai](https://fireworks.ai)
2. Sign up for a free account
3. Navigate to API settings
4. Generate a new API key

### 3. Configure Settings
1. Open Settings: `Ctrl/Cmd + ,`
2. Search for "fireworks"
3. Set your API key:

```json
{
  "chat.fireworks.apiKey": "your-api-key-here",
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct"
}
```

### 4. Start Using AI Agents
1. Open Chat: `Ctrl/Cmd + Shift + P` → "Chat: Focus on Chat View"
2. Select an agent from the selector
3. Ask your question!

**Example:**
```
[Debug Assistant] Why am I getting a TypeError?
[Code Reviewer] Review this function for best practices
[Security Scanner] Check this login function for vulnerabilities
```

---

## 📚 Documentation

### User Guides
- **[Quick Start Guide](QUICKSTART_AGENTS.md)** - Get started in 5 minutes
- **[Agentic Chat System](AGENTIC_CHAT_SYSTEM.md)** - Complete agent documentation
- **[Build Guide](BUILD_AND_DISTRIBUTE.md)** - Build from source

### For Developers
- **[Building from Source](#-building-from-source)**
- **[Contributing Guide](#-contributing)**
- **[Architecture Overview](AGENTIC_CHAT_SYSTEM.md#architecture)**

---

## 🛠️ Building from Source

### Prerequisites
- Node.js 18.x or later
- Python 3.x
- Git
- 16+ GB RAM (recommended)

### Build Steps

```bash
# 1. Clone the repository
git clone https://github.com/bankyresearch/duxx_ai.git
cd duxx_ai

# 2. Install dependencies
npm install

# 3. Compile TypeScript
npm run compile

# 4. Build the application
npm run build

# 5. Create installer for your platform
npm run package

# Or build for all platforms
npm run package:all
```

### Build Script

```bash
# Use the automated build script
./build-and-package.sh

# Build for all platforms
./build-and-package.sh --all
```

**Output:**
```
dist/
├── DuxxAI-Code-1.0.0-x64.exe              # Windows installer
├── DuxxAI-Code-1.0.0-universal.dmg        # macOS installer
├── DuxxAI-Code-1.0.0-x64.AppImage         # Linux portable
├── DuxxAI-Code-1.0.0-amd64.deb            # Debian/Ubuntu
├── DuxxAI-Code-1.0.0-x86_64.rpm           # Fedora/RHEL
└── SHA256SUMS.txt                         # Checksums
```

See **[BUILD_AND_DISTRIBUTE.md](BUILD_AND_DISTRIBUTE.md)** for detailed build instructions.

---

## 🌐 How It Works

### Architecture

```
┌────────────────────────────────────────────────────────┐
│              DuxxAI Code (Electron App)                 │
├────────────────────────────────────────────────────────┤
│                   Chat Interface                        │
│  [Debug] [Review] [Standards] [Security] [Assistant]   │
├────────────────────────────────────────────────────────┤
│             Agentic Chat Service                        │
│  • Agent Management                                     │
│  • Request Routing                                      │
│  • Context Building                                     │
├────────────────────────────────────────────────────────┤
│           Fireworks.ai Service                          │
│  • API Integration                                      │
│  • Model Selection (Llama, Mixtral, Qwen)              │
│  • Response Streaming                                   │
├────────────────────────────────────────────────────────┤
│               VS Code Platform                          │
│  • Editor, Debugger, Terminal, Extensions              │
└────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Electron** - Cross-platform desktop framework
- **TypeScript** - Type-safe development
- **VS Code** - Editor platform and infrastructure
- **Fireworks.ai** - AI model provider
- **Node.js** - Runtime environment

---

## 🎨 Comparison with Other Editors

| Feature | DuxxAI Code | Cursor | GitHub Copilot | VSCodium |
|---------|-------------|--------|----------------|----------|
| AI Agents | ✅ 6 specialized | ✅ General | ✅ General | ❌ |
| Debugging Agent | ✅ | ❌ | ❌ | ❌ |
| Security Scanner | ✅ | ❌ | ❌ | ❌ |
| Code Review | ✅ | ✅ | ❌ | ❌ |
| Open Source | ✅ | ❌ | ❌ | ✅ |
| Self-Hosted | ✅ | ❌ | ❌ | ✅ |
| Free | ✅ | Paid | Paid | ✅ |
| Model Choice | ✅ 4 models | ❌ | ❌ | N/A |

---

## 📖 Use Cases

### For Individual Developers
- **Debug faster** with AI-powered debugging assistance
- **Write better code** with automated code reviews
- **Stay secure** with vulnerability scanning
- **Learn continuously** with educational explanations

### For Teams
- **Standardize code quality** across the team
- **Enforce coding standards** automatically
- **Reduce security risks** with automated scanning
- **Onboard faster** with AI-assisted learning

### For Students
- **Learn programming** with interactive AI tutor
- **Understand errors** with detailed explanations
- **Improve code quality** with instant feedback
- **Free access** to advanced AI capabilities

---

## 🔧 Configuration

### Essential Settings

```json
{
  // Fireworks.ai Configuration
  "chat.fireworks.apiKey": "fw_xxx",
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct",

  // Agent Configuration
  "chat.agents.enabled": true,
  "chat.agents.defaultAgent": "default",
  "chat.agents.showSelector": true,

  // Optional: Telemetry
  "telemetry.enabled": false
}
```

### Model Selection

Choose the right model for your needs:

```json
{
  // Balanced (recommended)
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct",

  // Maximum capability
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-405b-instruct",

  // Fastest response
  "chat.fireworks.model": "accounts/fireworks/models/mixtral-8x7b-instruct",

  // Best for code
  "chat.fireworks.model": "accounts/fireworks/models/qwen2p5-72b-instruct"
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/duxx_ai.git
cd duxx_ai

# Create a branch
git checkout -b feature/your-feature

# Make changes and test
npm run compile
npm run build

# Commit and push
git commit -m "Add your feature"
git push origin feature/your-feature

# Create a Pull Request
```

### Areas to Contribute
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🌐 Translations
- 🧪 Tests

---

## 📜 License

MIT License - Copyright (c) 2025 DuxxAI

See [LICENSE.txt](LICENSE.txt) for details.

---

## 🆘 Support

### Get Help
- 📖 **Documentation**: [AGENTIC_CHAT_SYSTEM.md](AGENTIC_CHAT_SYSTEM.md)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/bankyresearch/duxx_ai/discussions)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/bankyresearch/duxx_ai/issues)
- 📧 **Email**: support@duxxai.com

### FAQ

**Q: Is DuxxAI Code free?**
A: Yes, 100% free and open source. You only need a Fireworks.ai API key (free tier available).

**Q: How is this different from VS Code?**
A: DuxxAI Code adds specialized AI agents, Fireworks.ai integration, and enhanced debugging tools.

**Q: Can I use my own AI models?**
A: Currently supports Fireworks.ai models. Support for additional providers planned.

**Q: Does it work offline?**
A: The editor works offline, but AI features require an internet connection.

**Q: How do I update?**
A: Updates are automatic. You'll be notified when a new version is available.

---

## 🗺️ Roadmap

### v1.1 (Q2 2025)
- [ ] Custom agent creation
- [ ] Agent prompt customization
- [ ] Multi-agent collaboration
- [ ] Local model support (Ollama)

### v1.2 (Q3 2025)
- [ ] Team collaboration features
- [ ] Shared agent configurations
- [ ] Usage analytics dashboard
- [ ] Mobile companion app

### v2.0 (Q4 2025)
- [ ] Plugin marketplace
- [ ] Advanced debugging tools
- [ ] Performance profiling agent
- [ ] AI-powered testing agent

---

## 🌟 Acknowledgments

Built with:
- [Visual Studio Code](https://github.com/microsoft/vscode) - Editor platform
- [Electron](https://www.electronjs.org/) - Desktop framework
- [Fireworks.ai](https://fireworks.ai) - AI infrastructure
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

<div align="center">

**Made with ❤️ by the DuxxAI Team**

[Website](https://duxxai.com) • [GitHub](https://github.com/bankyresearch/duxx_ai) • [Twitter](https://twitter.com/duxxai)

</div>
