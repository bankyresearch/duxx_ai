# Quick Start Guide: Agentic Chat System

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your Fireworks.ai API Key (2 minutes)

1. Visit [https://fireworks.ai](https://fireworks.ai)
2. Click "Sign Up" or "Login"
3. Go to "API Keys" in your dashboard
4. Click "Create New Key"
5. Copy your API key

### Step 2: Configure VS Code (1 minute)

1. Open VS Code Settings:
   - Windows/Linux: `Ctrl + ,`
   - Mac: `Cmd + ,`

2. Click the "Open Settings (JSON)" icon in the top right

3. Add these lines:

```json
{
  "chat.fireworks.apiKey": "paste-your-api-key-here",
  "chat.agents.enabled": true
}
```

4. Save and close

### Step 3: Try the Agents! (2 minutes)

1. **Open Chat**:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Chat: Focus on Chat View"
   - Press Enter

2. **Select an Agent**:
   - You'll see buttons at the top for each agent
   - Click on the agent you want to use

3. **Ask a Question**:
   - Type your question in the chat input
   - Press Enter
   - Watch the agent respond!

## 📋 Quick Examples

### Example 1: Debug Code

```
1. Click "Debug Assistant"
2. Type: "Why am I getting a TypeError: Cannot read property 'length' of undefined?"
3. Get debugging help!
```

### Example 2: Review Code

```
1. Click "Code Reviewer"
2. Paste your code
3. Type: "Review this function for quality and best practices"
4. Get improvement suggestions!
```

### Example 3: Security Check

```
1. Click "Security Scanner"
2. Type: "Check this login function for security vulnerabilities"
3. Get security recommendations!
```

## 🎯 Which Agent Should I Use?

| Task | Agent | Icon |
|------|-------|------|
| Fix bugs | Debug Assistant | 🐛 |
| Review code quality | Code Reviewer | ✓ |
| Check standards | Standards Checker | ✓ |
| Find security issues | Security Scanner | 🛡️ |
| General coding help | Code Assistant | 💡 |

## ⚙️ Optional Configuration

### Choose a Different Model

```json
{
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-405b-instruct"
}
```

**Available Models:**
- `llama-v3p1-70b-instruct` - Balanced (default)
- `llama-v3p1-405b-instruct` - Most powerful
- `mixtral-8x7b-instruct` - Fastest
- `qwen2p5-72b-instruct` - Best for code

### Set Default Agent

```json
{
  "chat.agents.defaultAgent": "debugging"
}
```

**Options:**
- `default` - General assistant
- `debugging` - Debug assistant
- `codeReview` - Code reviewer
- `industryStandards` - Standards checker
- `security` - Security scanner
- `codeAssistance` - Code assistant

## 🔧 Troubleshooting

### "Fireworks.ai Setup Required" Message?

**Problem:** You're seeing a setup message instead of AI responses.

**Solution:**
1. Check that you added `chat.fireworks.apiKey` to settings
2. Make sure the API key is valid
3. Restart VS Code

### Agent Not Responding?

**Quick Fixes:**
1. Check your internet connection
2. Verify the API key is correct
3. Look at VS Code Output panel (View → Output → Select "Chat")
4. Try a different model

### Can't See Agent Buttons?

**Solution:**
```json
{
  "chat.agents.showSelector": true
}
```

## 💡 Pro Tips

1. **Switch Agents Mid-Conversation**: Click a different agent button anytime to change context

2. **Use File Context**: Select code before asking - agents will analyze it automatically

3. **Follow Suggested Actions**: Click the action buttons agents provide for quick fixes

4. **Combine Agents**: Use Debug Assistant to find issues, then Code Reviewer to improve the fix

5. **Keyboard Shortcuts**: Set up custom shortcuts for frequently used agents

## 📚 Learn More

- Full documentation: See `AGENTIC_CHAT_SYSTEM.md`
- Fireworks.ai docs: [https://fireworks.ai/docs](https://fireworks.ai/docs)
- Report issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🎉 You're Ready!

You now have a complete agentic debugging and development assistant in VS Code. Happy coding!

---

**Need Help?**
- Check the full documentation: `AGENTIC_CHAT_SYSTEM.md`
- Ask in our community: [Link to discussions]
- Report bugs: [Link to issues]
