/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/agentSelector.css';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { Emitter } from '../../../../base/common/event.js';
import * as dom from '../../../../base/browser/dom.js';
import { IContextViewService } from '../../../../platform/contextview/browser/contextView.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { AgentType, IAgenticChatService, IAgentMetadata } from '../common/agenticChatService.js';
import { Button } from '../../../../base/browser/ui/button/button.js';
import { defaultButtonStyles } from '../../../../platform/theme/browser/defaultStyles.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../base/common/themables.js';

/**
 * Agent Selector Widget - Allows users to select different specialized agents
 */
export class AgentSelector extends Disposable {
	private readonly _onDidSelectAgent = this._register(new Emitter<AgentType>());
	readonly onDidSelectAgent = this._onDidSelectAgent.event;

	private readonly container: HTMLElement;
	private readonly agentButtons: Map<AgentType, Button> = new Map();
	private currentAgent: AgentType;

	constructor(
		parent: HTMLElement,
		@IAgenticChatService private readonly agenticChatService: IAgenticChatService,
		@IContextViewService private readonly contextViewService: IContextViewService,
		@IThemeService private readonly themeService: IThemeService
	) {
		super();

		this.currentAgent = this.agenticChatService.activeAgent;

		// Create container
		this.container = dom.append(parent, dom.$('.agent-selector'));

		// Create title
		const title = dom.append(this.container, dom.$('.agent-selector-title'));
		title.textContent = 'Select Agent:';

		// Create button container
		const buttonContainer = dom.append(this.container, dom.$('.agent-selector-buttons'));

		// Create buttons for each agent
		const agents = this.agenticChatService.getAvailableAgents();
		agents.forEach(agent => {
			this.createAgentButton(buttonContainer, agent);
		});

		// Listen for agent changes
		this._register(this.agenticChatService.onDidChangeActiveAgent(agentType => {
			this.updateActiveAgent(agentType);
		}));

		// Set initial active agent
		this.updateActiveAgent(this.currentAgent);
	}

	private createAgentButton(parent: HTMLElement, agent: IAgentMetadata): void {
		const buttonContainer = dom.append(parent, dom.$('.agent-button-container'));

		const button = this._register(new Button(buttonContainer, {
			...defaultButtonStyles,
			secondary: true
		}));

		// Set button label with icon
		const icon = this.getAgentIcon(agent.type);
		button.label = `$(${icon}) ${agent.name}`;
		button.element.title = agent.description;

		// Add click handler
		this._register(button.onDidClick(() => {
			this.selectAgent(agent.type);
		}));

		this.agentButtons.set(agent.type, button);
	}

	private getAgentIcon(agentType: AgentType): string {
		switch (agentType) {
			case AgentType.Debugging:
				return 'bug';
			case AgentType.CodeReview:
				return 'checklist';
			case AgentType.IndustryStandards:
				return 'verified';
			case AgentType.Security:
				return 'shield';
			case AgentType.CodeAssistance:
				return 'lightbulb';
			default:
				return 'comment';
		}
	}

	private selectAgent(agentType: AgentType): void {
		if (this.currentAgent === agentType) {
			return;
		}

		this.currentAgent = agentType;
		this.agenticChatService.setActiveAgent(agentType);
		this._onDidSelectAgent.fire(agentType);
	}

	private updateActiveAgent(agentType: AgentType): void {
		this.currentAgent = agentType;

		// Update button styles
		this.agentButtons.forEach((button, type) => {
			if (type === agentType) {
				button.element.classList.add('active');
			} else {
				button.element.classList.remove('active');
			}
		});
	}

	getContainer(): HTMLElement {
		return this.container;
	}
}

/**
 * Compact Agent Selector - Dropdown style selector for limited space
 */
export class CompactAgentSelector extends Disposable {
	private readonly _onDidSelectAgent = this._register(new Emitter<AgentType>());
	readonly onDidSelectAgent = this._onDidSelectAgent.event;

	private readonly container: HTMLElement;
	private readonly selectElement: HTMLSelectElement;
	private currentAgent: AgentType;

	constructor(
		parent: HTMLElement,
		@IAgenticChatService private readonly agenticChatService: IAgenticChatService,
		@IThemeService private readonly themeService: IThemeService
	) {
		super();

		this.currentAgent = this.agenticChatService.activeAgent;

		// Create container
		this.container = dom.append(parent, dom.$('.compact-agent-selector'));

		// Create label
		const label = dom.append(this.container, dom.$('.agent-selector-label'));
		label.textContent = 'Agent:';

		// Create select element
		this.selectElement = dom.append(this.container, dom.$('select.agent-selector-dropdown')) as HTMLSelectElement;

		// Populate options
		const agents = this.agenticChatService.getAvailableAgents();
		agents.forEach(agent => {
			const option = dom.$('option') as HTMLOptionElement;
			option.value = agent.type;
			option.textContent = agent.name;
			option.title = agent.description;

			if (agent.type === this.currentAgent) {
				option.selected = true;
			}

			this.selectElement.appendChild(option);
		});

		// Add change handler
		this._register(dom.addDisposableListener(this.selectElement, 'change', () => {
			const selectedType = this.selectElement.value as AgentType;
			this.selectAgent(selectedType);
		}));

		// Listen for agent changes
		this._register(this.agenticChatService.onDidChangeActiveAgent(agentType => {
			this.updateActiveAgent(agentType);
		}));
	}

	private selectAgent(agentType: AgentType): void {
		if (this.currentAgent === agentType) {
			return;
		}

		this.currentAgent = agentType;
		this.agenticChatService.setActiveAgent(agentType);
		this._onDidSelectAgent.fire(agentType);
	}

	private updateActiveAgent(agentType: AgentType): void {
		this.currentAgent = agentType;
		this.selectElement.value = agentType;
	}

	getContainer(): HTMLElement {
		return this.container;
	}
}
