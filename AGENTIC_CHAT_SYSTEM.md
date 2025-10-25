# Agentic Chat System for VS Code

## Overview

This VS Code extension has been enhanced with a complete **Agentic-Based AI Solution** that provides specialized AI agents for different development tasks. Users can select different agents in the chatbot interface, each optimized for specific purposes like debugging, code review, security analysis, and more.

## Features

### 🤖 Specialized AI Agents

The system includes six specialized agents:

1. **Debug Assistant** (`bug` icon)
   - Expert at finding bugs and analyzing errors
   - Helps identify root causes of issues
   - Suggests precise fixes with explanations
   - Assists with error messages and stack traces
   - Provides debugging strategies and tools

2. **Code Reviewer** (`checklist` icon)
   - Reviews code quality and maintainability
   - Identifies anti-patterns and code smells
   - Suggests improvements and refactoring
   - Checks consistency and readability
   - Evaluates performance implications

3. **Standards Checker** (`verified` icon)
   - Ensures compliance with industry standards
   - Checks language-specific conventions (PEP 8, PSR, Google Style Guide, etc.)
   - Verifies architectural patterns (SOLID, DRY, KISS)
   - Validates accessibility standards (WCAG, ARIA)
   - Reviews security standards (OWASP, CWE)

4. **Security Scanner** (`shield` icon)
   - Identifies security vulnerabilities
   - Detects insecure coding practices
   - Checks for exposed secrets and credentials
   - Analyzes authentication and authorization
   - Reviews data validation and sanitization

5. **Code Assistant** (`lightbulb` icon)
   - General coding help and suggestions
   - Explains code concepts and patterns
   - Provides code examples and templates
   - Assists with API usage
   - Offers learning resources

6. **General Assistant** (`comment` icon)
   - General purpose AI assistant
   - Helps with various development tasks
   - Default agent for new chat sessions

### 🔥 Fireworks.ai Integration

The system integrates with [Fireworks.ai](https://fireworks.ai) for enhanced AI capabilities:

- **Multiple Model Support**:
  - Llama 3.1 70B Instruct (Balanced performance)
  - Llama 3.1 405B Instruct (Highest capability)
  - Mixtral 8x7B Instruct (Fast MoE model)
  - Qwen 2.5 72B Instruct (Excellent for code)

- **Advanced Features**:
  - Code assistance with context awareness
  - Conversational AI capabilities
  - Search and retrieval augmentation
  - Function calling support

## Setup

### 1. Get a Fireworks.ai API Key

1. Visit [https://fireworks.ai](https://fireworks.ai)
2. Sign up for an account
3. Navigate to your API settings
4. Generate a new API key

### 2. Configure VS Code Settings

Add the following to your VS Code settings (`settings.json`):

```json
{
  // Fireworks.ai Configuration
  "chat.fireworks.apiKey": "YOUR_API_KEY_HERE",
  "chat.fireworks.baseUrl": "https://api.fireworks.ai/inference/v1",
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct",

  // Agent Configuration
  "chat.agents.enabled": true,
  "chat.agents.defaultAgent": "default",
  "chat.agents.showSelector": true
}
```

### 3. Available Models

Choose from the following models by setting `chat.fireworks.model`:

- `accounts/fireworks/models/llama-v3p1-70b-instruct` - Balanced (default)
- `accounts/fireworks/models/llama-v3p1-405b-instruct` - Most capable
- `accounts/fireworks/models/mixtral-8x7b-instruct` - Fastest
- `accounts/fireworks/models/qwen2p5-72b-instruct` - Best for code

## Usage

### Using the Agent Selector

1. **Open Chat Panel**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and select "Chat: Focus on Chat View"

2. **Select an Agent**: At the top of the chat interface, you'll see the agent selector with buttons for each agent type

3. **Ask Questions**: Type your question or request. The selected agent will process it with its specialized knowledge

4. **Switch Agents**: Click on a different agent button to switch contexts

### Agent Selection Shortcuts

The compact selector dropdown allows quick agent switching without taking up much screen space.

### Example Workflows

#### Debugging Workflow
```
1. Select "Debug Assistant" agent
2. Paste error message or code with issue
3. Agent analyzes and suggests fixes
4. Click "Set Breakpoint" or "Start Debugging" from suggested actions
```

#### Code Review Workflow
```
1. Select "Code Reviewer" agent
2. Share code snippet or file
3. Agent provides quality assessment
4. Click "Format Code" or "Run Linter" to apply improvements
```

#### Security Audit Workflow
```
1. Select "Security Scanner" agent
2. Share code or describe security concerns
3. Agent identifies vulnerabilities
4. Click "Run Security Scan" or "Check Dependencies"
```

## Configuration Options

### Agent Settings

```json
{
  // Enable/disable agent system
  "chat.agents.enabled": true,

  // Set default agent for new sessions
  "chat.agents.defaultAgent": "default",
  // Options: "default", "debugging", "codeReview", "industryStandards", "security", "codeAssistance"

  // Show/hide agent selector in UI
  "chat.agents.showSelector": true
}
```

### Fireworks.ai Settings

```json
{
  // Your Fireworks.ai API key
  "chat.fireworks.apiKey": "",

  // API endpoint (usually don't need to change)
  "chat.fireworks.baseUrl": "https://api.fireworks.ai/inference/v1",

  // Model selection
  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct"
}
```

## Architecture

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                   Chat Interface (UI)                    │
├─────────────────────────────────────────────────────────┤
│              Agent Selector Component                    │
├─────────────────────────────────────────────────────────┤
│            Agentic Chat Service (Manager)                │
├───────────────┬─────────────────────────────────────────┤
│  Agents:      │  Fireworks.ai Service                    │
│  - Debugging  │  ├─ API Client                           │
│  - Review     │  ├─ Model Selection                      │
│  - Standards  │  └─ Response Streaming                   │
│  - Security   │                                          │
│  - Assistant  │                                          │
└───────────────┴─────────────────────────────────────────┘
```

### Key Components

1. **AgenticChatService** (`agenticChatService.ts`)
   - Manages all agents
   - Handles agent selection
   - Routes requests to appropriate agents
   - Generates agent-specific prompts

2. **FireworksAIService** (`fireworksAIService.ts`)
   - Interfaces with Fireworks.ai API
   - Manages model selection
   - Handles API authentication
   - Processes streaming responses

3. **AgentSelector** (`agentSelector.ts`)
   - UI component for agent selection
   - Button-based and dropdown variants
   - Visual feedback for active agent

## Use Cases

### For Code Assistance

Use **Code Assistant** when you need help with:
- Writing new code
- Understanding unfamiliar syntax
- Finding the right API to use
- Getting code examples
- Learning new concepts

### For Debugging

Use **Debug Assistant** when you:
- Encounter runtime errors
- See unexpected behavior
- Need to trace execution flow
- Want to understand error messages
- Need debugging strategies

### For Code Reviews

Use **Code Reviewer** before:
- Committing code
- Creating pull requests
- Refactoring existing code
- Improving code quality
- Ensuring maintainability

### For Standards Compliance

Use **Standards Checker** to:
- Verify coding conventions
- Check accessibility compliance
- Validate architectural patterns
- Ensure documentation standards
- Review API design

### For Security

Use **Security Scanner** to:
- Find vulnerabilities
- Audit authentication logic
- Check input validation
- Review cryptography usage
- Scan for exposed secrets

## Advanced Features

### Context-Aware Responses

Each agent receives context including:
- Current file content
- Programming language
- Selected code snippet
- Workspace information
- Previous conversation history

### Suggested Actions

Agents provide actionable suggestions:
- **Quick Fixes**: One-click code improvements
- **Tool Integration**: Launch debugger, run linter, etc.
- **Documentation**: Generate docs, add comments
- **Refactoring**: Apply automated refactoring

### Multi-Turn Conversations

Agents maintain conversation context:
- Follow-up questions
- Iterative refinement
- Progressive problem solving
- Learning from feedback

## Troubleshooting

### Agent Not Responding

1. Check Fireworks.ai API key is configured
2. Verify internet connection
3. Check VS Code output panel for errors
4. Try switching to a different model

### API Rate Limits

If you hit rate limits:
1. Use a smaller model (Mixtral 8x7B)
2. Reduce request frequency
3. Upgrade your Fireworks.ai plan

### Configuration Issues

1. Verify `settings.json` syntax is valid
2. Restart VS Code after configuration changes
3. Check for conflicting extensions

## Roadmap

### Planned Features

- [ ] Custom agent creation
- [ ] Agent prompt customization
- [ ] Multi-agent collaboration
- [ ] Agent memory and learning
- [ ] Integration with additional AI providers
- [ ] Advanced debugging tools
- [ ] Automated testing suggestions
- [ ] Performance optimization recommendations

## Contributing

We welcome contributions! Areas of focus:

1. **New Agent Types**: Create specialized agents for specific domains
2. **UI Improvements**: Enhance the agent selector interface
3. **Integration**: Add support for more AI providers
4. **Documentation**: Improve examples and tutorials

## Resources

- [Fireworks.ai Documentation](https://fireworks.ai/docs)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Llama 3.1 Model Card](https://ai.meta.com/llama/)

## License

This extension follows the same license as VS Code (MIT).

## Support

For issues and feature requests, please visit:
- GitHub Issues: [Link to your repository issues]
- Documentation: [Link to docs]
- Community: [Link to discussions]

---

**Note**: This is an experimental feature. Some capabilities may require specific Fireworks.ai plan tiers. Check [Fireworks.ai pricing](https://fireworks.ai/pricing) for details.
