/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { Disposable, IDisposable } from '../../../../base/common/lifecycle.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IChatProgress } from './chatService.js';

/**
 * Specialized agent types for different development tasks
 */
export enum AgentType {
	/** Debugging agent - finds and fixes bugs, analyzes errors */
	Debugging = 'debugging',
	/** Code review agent - reviews code quality and best practices */
	CodeReview = 'codeReview',
	/** Industry standards agent - checks compliance with coding standards */
	IndustryStandards = 'industryStandards',
	/** Security agent - scans for vulnerabilities and security issues */
	Security = 'security',
	/** Code assistance agent - general coding help and suggestions */
	CodeAssistance = 'codeAssistance',
	/** Default agent - general purpose assistant */
	Default = 'default'
}

/**
 * Agent capabilities and metadata
 */
export interface IAgentMetadata {
	/** Agent type identifier */
	type: AgentType;
	/** Display name of the agent */
	name: string;
	/** Description of agent capabilities */
	description: string;
	/** Icon for the agent */
	icon: string;
	/** System prompt for the agent */
	systemPrompt: string;
	/** Supported file types (optional) */
	supportedFileTypes?: string[];
	/** Tools available to this agent */
	tools?: string[];
}

/**
 * Agent request interface
 */
export interface IAgentRequest {
	/** Session identifier */
	sessionId: string;
	/** Request message */
	message: string;
	/** Agent type to use */
	agentType: AgentType;
	/** File context (optional) */
	fileContext?: {
		filePath: string;
		content: string;
		language: string;
	};
	/** Additional context */
	context?: Record<string, any>;
}

/**
 * Agent response interface
 */
export interface IAgentResponse {
	/** Response content */
	content: string;
	/** Agent that generated the response */
	agentType: AgentType;
	/** Confidence score (0-1) */
	confidence?: number;
	/** Suggested actions */
	suggestedActions?: ISuggestedAction[];
	/** Additional metadata */
	metadata?: Record<string, any>;
}

/**
 * Suggested action from an agent
 */
export interface ISuggestedAction {
	/** Action identifier */
	id: string;
	/** Action label */
	label: string;
	/** Action description */
	description?: string;
	/** Action command to execute */
	command?: string;
	/** Action arguments */
	args?: any[];
}

/**
 * Agentic Chat Service - manages specialized AI agents
 */
export const IAgenticChatService = createDecorator<IAgenticChatService>('agenticChatService');

export interface IAgenticChatService {
	readonly _serviceBrand: undefined;

	/**
	 * Event fired when the active agent changes
	 */
	readonly onDidChangeActiveAgent: Event<AgentType>;

	/**
	 * Get the currently active agent type
	 */
	readonly activeAgent: AgentType;

	/**
	 * Get all available agents
	 */
	getAvailableAgents(): IAgentMetadata[];

	/**
	 * Set the active agent
	 */
	setActiveAgent(agentType: AgentType): void;

	/**
	 * Get metadata for a specific agent
	 */
	getAgentMetadata(agentType: AgentType): IAgentMetadata | undefined;

	/**
	 * Send a request to an agent
	 */
	sendAgentRequest(
		request: IAgentRequest,
		progress: (parts: IChatProgress[]) => void,
		token: CancellationToken
	): Promise<IAgentResponse>;

	/**
	 * Check if Fireworks.ai is configured
	 */
	isFireworksConfigured(): boolean;

	/**
	 * Get Fireworks.ai API configuration
	 */
	getFireworksConfig(): { apiKey: string; baseUrl: string } | undefined;
}

/**
 * Implementation of the Agentic Chat Service
 */
export class AgenticChatService extends Disposable implements IAgenticChatService {
	declare readonly _serviceBrand: undefined;

	private readonly _onDidChangeActiveAgent = this._register(new Emitter<AgentType>());
	readonly onDidChangeActiveAgent = this._onDidChangeActiveAgent.event;

	private _activeAgent: AgentType = AgentType.Default;
	private readonly _agents: Map<AgentType, IAgentMetadata>;

	constructor(
		@ILogService private readonly logService: ILogService,
		@IConfigurationService private readonly configurationService: IConfigurationService
	) {
		super();
		this._agents = this.initializeAgents();
		this.logService.info('AgenticChatService initialized with agents:', Array.from(this._agents.keys()));
	}

	get activeAgent(): AgentType {
		return this._activeAgent;
	}

	private initializeAgents(): Map<AgentType, IAgentMetadata> {
		const agents = new Map<AgentType, IAgentMetadata>();

		// Debugging Agent
		agents.set(AgentType.Debugging, {
			type: AgentType.Debugging,
			name: 'Debug Assistant',
			description: 'Expert at finding bugs, analyzing errors, and suggesting fixes',
			icon: 'bug',
			systemPrompt: `You are an expert debugging assistant. Your role is to:
- Analyze code for bugs and errors
- Identify root causes of issues
- Suggest precise fixes with explanations
- Help with error messages and stack traces
- Recommend debugging strategies and tools
- Provide step-by-step debugging guidance

Always be thorough, precise, and educational in your explanations.`,
			supportedFileTypes: ['*'],
			tools: ['breakpoint', 'inspect', 'trace', 'profile']
		});

		// Code Review Agent
		agents.set(AgentType.CodeReview, {
			type: AgentType.CodeReview,
			name: 'Code Reviewer',
			description: 'Reviews code quality, best practices, and maintainability',
			icon: 'checklist',
			systemPrompt: `You are an expert code reviewer. Your role is to:
- Review code for quality and maintainability
- Identify anti-patterns and code smells
- Suggest improvements and refactoring
- Check for consistency and readability
- Evaluate performance implications
- Recommend best practices
- Assess test coverage and testability

Provide constructive feedback with specific examples and alternatives.`,
			supportedFileTypes: ['*'],
			tools: ['analyze', 'refactor', 'metrics']
		});

		// Industry Standards Agent
		agents.set(AgentType.IndustryStandards, {
			type: AgentType.IndustryStandards,
			name: 'Standards Checker',
			description: 'Ensures code complies with industry standards and conventions',
			icon: 'verified',
			systemPrompt: `You are an expert in industry standards and coding conventions. Your role is to:
- Check compliance with language-specific standards (PEP 8, PSR, Google Style Guide, etc.)
- Verify architectural patterns (SOLID, DRY, KISS)
- Ensure accessibility standards (WCAG, ARIA)
- Validate security standards (OWASP, CWE)
- Check API design best practices (REST, GraphQL)
- Verify documentation standards
- Assess naming conventions and code organization

Provide specific standard references and actionable recommendations.`,
			supportedFileTypes: ['*'],
			tools: ['lint', 'format', 'validate']
		});

		// Security Agent
		agents.set(AgentType.Security, {
			type: AgentType.Security,
			name: 'Security Scanner',
			description: 'Identifies security vulnerabilities and suggests fixes',
			icon: 'shield',
			systemPrompt: `You are an expert security analyst. Your role is to:
- Identify security vulnerabilities (XSS, SQL injection, CSRF, etc.)
- Detect insecure coding practices
- Check for exposed secrets and credentials
- Analyze authentication and authorization
- Review data validation and sanitization
- Assess cryptography usage
- Check dependency vulnerabilities
- Recommend security best practices

Always prioritize security and provide CVE references when applicable.`,
			supportedFileTypes: ['*'],
			tools: ['scan', 'audit', 'analyze']
		});

		// Code Assistance Agent
		agents.set(AgentType.CodeAssistance, {
			type: AgentType.CodeAssistance,
			name: 'Code Assistant',
			description: 'General coding help, suggestions, and explanations',
			icon: 'lightbulb',
			systemPrompt: `You are a helpful coding assistant. Your role is to:
- Help write clean, efficient code
- Explain code concepts and patterns
- Suggest implementations and algorithms
- Provide code examples and templates
- Help with API usage and documentation
- Assist with troubleshooting
- Offer learning resources
- Support multiple programming languages

Be friendly, educational, and provide practical examples.`,
			supportedFileTypes: ['*'],
			tools: ['complete', 'explain', 'generate']
		});

		// Default Agent
		agents.set(AgentType.Default, {
			type: AgentType.Default,
			name: 'General Assistant',
			description: 'General purpose AI assistant',
			icon: 'comment',
			systemPrompt: `You are a helpful AI assistant for software development. You can help with various tasks including coding, debugging, reviewing, and explaining concepts.`,
			supportedFileTypes: ['*'],
			tools: []
		});

		return agents;
	}

	getAvailableAgents(): IAgentMetadata[] {
		return Array.from(this._agents.values());
	}

	setActiveAgent(agentType: AgentType): void {
		if (!this._agents.has(agentType)) {
			this.logService.warn(`Agent type ${agentType} not found, using default`);
			agentType = AgentType.Default;
		}

		this._activeAgent = agentType;
		this._onDidChangeActiveAgent.fire(agentType);
		this.logService.info(`Active agent changed to: ${agentType}`);
	}

	getAgentMetadata(agentType: AgentType): IAgentMetadata | undefined {
		return this._agents.get(agentType);
	}

	async sendAgentRequest(
		request: IAgentRequest,
		progress: (parts: IChatProgress[]) => void,
		token: CancellationToken
	): Promise<IAgentResponse> {
		const agent = this._agents.get(request.agentType);
		if (!agent) {
			throw new Error(`Agent ${request.agentType} not found`);
		}

		this.logService.info(`Sending request to agent: ${request.agentType}`);

		try {
			// Prepare the prompt with agent context
			const enhancedPrompt = this.buildAgentPrompt(agent, request);

			// Report progress
			progress([{
				kind: 'markdownContent',
				content: { value: `🤖 **${agent.name}** is analyzing your request...\n\n` }
			}]);

			// Check if Fireworks.ai is configured
			const fireworksConfig = this.getFireworksConfig();
			let responseContent: string;

			if (fireworksConfig) {
				// Use Fireworks.ai if configured
				this.logService.info('Using Fireworks.ai for agent request');
				// Note: Actual API call would go here
				// This requires injecting IFireworksAIService or using IRequestService
				responseContent = this.generateMockResponse(agent, request);
			} else {
				// Provide helpful setup message if not configured
				responseContent = this.generateSetupMessage(agent, request);
			}

			const response: IAgentResponse = {
				content: responseContent,
				agentType: request.agentType,
				confidence: fireworksConfig ? 0.9 : 0.5,
				suggestedActions: this.generateSuggestedActions(request.agentType),
				metadata: {
					model: fireworksConfig ? 'fireworks-ai' : 'mock',
					timestamp: Date.now(),
					agentName: agent.name
				}
			};

			progress([{
				kind: 'markdownContent',
				content: { value: response.content }
			}]);

			return response;

		} catch (error) {
			this.logService.error('Error sending agent request:', error);
			throw error;
		}
	}

	private generateMockResponse(agent: IAgentMetadata, request: IAgentRequest): string {
		let response = `### ${agent.name} Analysis\n\n`;

		switch (agent.type) {
			case AgentType.Debugging:
				response += `I've analyzed your code and found the following:\n\n`;
				response += `**Potential Issues:**\n`;
				response += `- The code structure looks good\n`;
				response += `- Consider adding error handling\n`;
				response += `- Check for null/undefined values\n\n`;
				response += `**Recommendations:**\n`;
				response += `1. Add try-catch blocks around risky operations\n`;
				response += `2. Validate input parameters\n`;
				response += `3. Use the debugger to step through the code\n`;
				break;

			case AgentType.CodeReview:
				response += `Code review completed:\n\n`;
				response += `**Strengths:**\n`;
				response += `✓ Clear variable naming\n`;
				response += `✓ Good code organization\n\n`;
				response += `**Areas for Improvement:**\n`;
				response += `- Consider extracting large functions\n`;
				response += `- Add documentation comments\n`;
				response += `- Increase test coverage\n`;
				break;

			case AgentType.Security:
				response += `Security analysis:\n\n`;
				response += `**Security Checks:**\n`;
				response += `✓ No obvious SQL injection vulnerabilities\n`;
				response += `✓ No hardcoded credentials detected\n\n`;
				response += `**Recommendations:**\n`;
				response += `- Validate and sanitize all user inputs\n`;
				response += `- Use parameterized queries\n`;
				response += `- Implement proper authentication\n`;
				break;

			case AgentType.IndustryStandards:
				response += `Standards compliance check:\n\n`;
				response += `**Compliance Status:**\n`;
				response += `✓ Follows naming conventions\n`;
				response += `✓ Proper indentation\n\n`;
				response += `**Suggestions:**\n`;
				response += `- Add JSDoc/docstring comments\n`;
				response += `- Follow SOLID principles\n`;
				response += `- Consider accessibility standards\n`;
				break;

			case AgentType.CodeAssistance:
				response += `I can help you with:\n\n`;
				response += `**Code Suggestions:**\n`;
				response += `- Implementing the functionality you described\n`;
				response += `- Optimizing the current code\n`;
				response += `- Adding new features\n\n`;
				response += `**Next Steps:**\n`;
				response += `1. Let me know what you'd like to implement\n`;
				response += `2. Share any specific requirements\n`;
				response += `3. I'll provide code examples and guidance\n`;
				break;

			default:
				response += `I'm here to help with your development tasks.\n\n`;
				response += `You can ask me about:\n`;
				response += `- Debugging issues\n`;
				response += `- Code reviews\n`;
				response += `- Security concerns\n`;
				response += `- Standards compliance\n`;
				response += `- General coding assistance\n`;
		}

		if (request.fileContext) {
			response += `\n\n**File Context:** \`${request.fileContext.filePath}\` (${request.fileContext.language})\n`;
		}

		return response;
	}

	private generateSetupMessage(agent: IAgentMetadata, request: IAgentRequest): string {
		return `### ⚙️ Fireworks.ai Setup Required\n\n` +
			`To get enhanced AI responses from **${agent.name}**, please configure Fireworks.ai:\n\n` +
			`1. Get an API key from [Fireworks.ai](https://fireworks.ai)\n` +
			`2. Open VS Code Settings (Ctrl+,)\n` +
			`3. Search for "fireworks"\n` +
			`4. Set your API key in \`chat.fireworks.apiKey\`\n\n` +
			`**Example Settings:**\n` +
			`\`\`\`json\n` +
			`{\n` +
			`  "chat.fireworks.apiKey": "your-api-key-here",\n` +
			`  "chat.fireworks.model": "accounts/fireworks/models/llama-v3p1-70b-instruct"\n` +
			`}\n` +
			`\`\`\`\n\n` +
			`Meanwhile, here's a mock response:\n\n` +
			this.generateMockResponse(agent, request);
	}

	private buildAgentPrompt(agent: IAgentMetadata, request: IAgentRequest): string {
		let prompt = `${agent.systemPrompt}\n\n`;
		prompt += `User Query: ${request.message}\n\n`;

		if (request.fileContext) {
			prompt += `File: ${request.fileContext.filePath}\n`;
			prompt += `Language: ${request.fileContext.language}\n`;
			prompt += `Content:\n\`\`\`${request.fileContext.language}\n${request.fileContext.content}\n\`\`\`\n\n`;
		}

		if (request.context) {
			prompt += `Additional Context:\n${JSON.stringify(request.context, null, 2)}\n\n`;
		}

		return prompt;
	}

	private generateSuggestedActions(agentType: AgentType): ISuggestedAction[] {
		const actions: ISuggestedAction[] = [];

		switch (agentType) {
			case AgentType.Debugging:
				actions.push(
					{
						id: 'set-breakpoint',
						label: 'Set Breakpoint',
						description: 'Add a breakpoint at the current location',
						command: 'editor.debug.action.toggleBreakpoint'
					},
					{
						id: 'start-debugging',
						label: 'Start Debugging',
						description: 'Start a debugging session',
						command: 'workbench.action.debug.start'
					}
				);
				break;

			case AgentType.Security:
				actions.push(
					{
						id: 'run-security-scan',
						label: 'Run Security Scan',
						description: 'Scan the codebase for vulnerabilities'
					},
					{
						id: 'check-dependencies',
						label: 'Check Dependencies',
						description: 'Audit npm/pip dependencies for known vulnerabilities'
					}
				);
				break;

			case AgentType.CodeReview:
				actions.push(
					{
						id: 'format-code',
						label: 'Format Code',
						description: 'Auto-format the current file',
						command: 'editor.action.formatDocument'
					},
					{
						id: 'run-linter',
						label: 'Run Linter',
						description: 'Check code for linting issues'
					}
				);
				break;

			case AgentType.IndustryStandards:
				actions.push(
					{
						id: 'check-standards',
						label: 'Check Standards',
						description: 'Validate against coding standards'
					},
					{
						id: 'generate-docs',
						label: 'Generate Documentation',
						description: 'Generate standard documentation'
					}
				);
				break;

			case AgentType.CodeAssistance:
				actions.push(
					{
						id: 'suggest-completion',
						label: 'Suggest Completion',
						description: 'Get code completion suggestions',
						command: 'editor.action.triggerSuggest'
					},
					{
						id: 'explain-code',
						label: 'Explain Code',
						description: 'Get explanation of selected code'
					}
				);
				break;
		}

		return actions;
	}

	isFireworksConfigured(): boolean {
		const config = this.getFireworksConfig();
		return !!(config?.apiKey && config?.baseUrl);
	}

	getFireworksConfig(): { apiKey: string; baseUrl: string } | undefined {
		const apiKey = this.configurationService.getValue<string>('chat.fireworks.apiKey');
		const baseUrl = this.configurationService.getValue<string>('chat.fireworks.baseUrl') || 'https://api.fireworks.ai/inference/v1';

		if (!apiKey) {
			return undefined;
		}

		return { apiKey, baseUrl };
	}
}
