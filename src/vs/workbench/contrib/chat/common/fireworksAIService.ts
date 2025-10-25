/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IRequestService } from '../../../../platform/request/common/request.js';

/**
 * Fireworks.ai model configuration
 */
export interface IFireworksModel {
	/** Model identifier */
	id: string;
	/** Model name */
	name: string;
	/** Model description */
	description?: string;
	/** Context window size */
	contextWindow: number;
	/** Max output tokens */
	maxTokens: number;
	/** Supports function calling */
	supportsFunctions: boolean;
}

/**
 * Fireworks.ai chat message
 */
export interface IFireworksMessage {
	/** Message role */
	role: 'system' | 'user' | 'assistant';
	/** Message content */
	content: string;
}

/**
 * Fireworks.ai completion request
 */
export interface IFireworksCompletionRequest {
	/** Model to use */
	model: string;
	/** Chat messages */
	messages: IFireworksMessage[];
	/** Temperature (0-1) */
	temperature?: number;
	/** Max tokens to generate */
	max_tokens?: number;
	/** Top P sampling */
	top_p?: number;
	/** Frequency penalty */
	frequency_penalty?: number;
	/** Presence penalty */
	presence_penalty?: number;
	/** Stop sequences */
	stop?: string[];
	/** Stream responses */
	stream?: boolean;
}

/**
 * Fireworks.ai completion response
 */
export interface IFireworksCompletionResponse {
	/** Response ID */
	id: string;
	/** Object type */
	object: string;
	/** Created timestamp */
	created: number;
	/** Model used */
	model: string;
	/** Choices */
	choices: Array<{
		/** Choice index */
		index: number;
		/** Message */
		message: {
			/** Message role */
			role: string;
			/** Message content */
			content: string;
		};
		/** Finish reason */
		finish_reason: string;
	}>;
	/** Usage statistics */
	usage: {
		/** Prompt tokens */
		prompt_tokens: number;
		/** Completion tokens */
		completion_tokens: number;
		/** Total tokens */
		total_tokens: number;
	};
}

/**
 * Fireworks.ai Service
 */
export const IFireworksAIService = createDecorator<IFireworksAIService>('fireworksAIService');

export interface IFireworksAIService {
	readonly _serviceBrand: undefined;

	/**
	 * Get available models
	 */
	getAvailableModels(): IFireworksModel[];

	/**
	 * Send a completion request
	 */
	complete(
		request: IFireworksCompletionRequest,
		onProgress?: (chunk: string) => void,
		token?: CancellationToken
	): Promise<IFireworksCompletionResponse>;

	/**
	 * Check if service is configured
	 */
	isConfigured(): boolean;
}

/**
 * Fireworks.ai Service Implementation
 */
export class FireworksAIService extends Disposable implements IFireworksAIService {
	declare readonly _serviceBrand: undefined;

	private readonly availableModels: IFireworksModel[] = [
		{
			id: 'accounts/fireworks/models/llama-v3p1-70b-instruct',
			name: 'Llama 3.1 70B Instruct',
			description: 'Meta\'s Llama 3.1 70B model, optimized for instruction following',
			contextWindow: 131072,
			maxTokens: 4096,
			supportsFunctions: true
		},
		{
			id: 'accounts/fireworks/models/llama-v3p1-405b-instruct',
			name: 'Llama 3.1 405B Instruct',
			description: 'Meta\'s largest Llama 3.1 model, highest capability',
			contextWindow: 131072,
			maxTokens: 4096,
			supportsFunctions: true
		},
		{
			id: 'accounts/fireworks/models/mixtral-8x7b-instruct',
			name: 'Mixtral 8x7B Instruct',
			description: 'Mistral\'s mixture of experts model',
			contextWindow: 32768,
			maxTokens: 4096,
			supportsFunctions: true
		},
		{
			id: 'accounts/fireworks/models/qwen2p5-72b-instruct',
			name: 'Qwen 2.5 72B Instruct',
			description: 'Alibaba\'s Qwen 2.5 model, excellent for code',
			contextWindow: 131072,
			maxTokens: 4096,
			supportsFunctions: true
		}
	];

	constructor(
		@ILogService private readonly logService: ILogService,
		@IConfigurationService private readonly configurationService: IConfigurationService,
		@IRequestService private readonly requestService: IRequestService
	) {
		super();
		this.logService.info('FireworksAIService initialized');
	}

	getAvailableModels(): IFireworksModel[] {
		return this.availableModels;
	}

	isConfigured(): boolean {
		const apiKey = this.getApiKey();
		return !!apiKey;
	}

	async complete(
		request: IFireworksCompletionRequest,
		onProgress?: (chunk: string) => void,
		token?: CancellationToken
	): Promise<IFireworksCompletionResponse> {
		const apiKey = this.getApiKey();
		if (!apiKey) {
			throw new Error('Fireworks.ai API key not configured. Please set chat.fireworks.apiKey in settings.');
		}

		const baseUrl = this.getBaseUrl();
		const url = `${baseUrl}/chat/completions`;

		this.logService.info(`Sending Fireworks.ai request to ${url} with model ${request.model}`);

		try {
			const response = await this.requestService.request({
				type: 'POST',
				url: url,
				data: JSON.stringify({
					...request,
					stream: request.stream ?? false
				}),
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				},
				timeout: 60000 // 60 second timeout
			}, token || CancellationToken.None);

			if (response.res.statusCode !== 200) {
				const errorText = await this.readResponseText(response.stream);
				throw new Error(`Fireworks.ai API error (${response.res.statusCode}): ${errorText}`);
			}

			const responseText = await this.readResponseText(response.stream);
			const result: IFireworksCompletionResponse = JSON.parse(responseText);

			this.logService.info(`Fireworks.ai request completed. Tokens used: ${result.usage.total_tokens}`);

			return result;

		} catch (error) {
			this.logService.error('Fireworks.ai request failed:', error);
			throw error;
		}
	}

	private getApiKey(): string | undefined {
		return this.configurationService.getValue<string>('chat.fireworks.apiKey');
	}

	private getBaseUrl(): string {
		return this.configurationService.getValue<string>('chat.fireworks.baseUrl')
			|| 'https://api.fireworks.ai/inference/v1';
	}

	private async readResponseText(stream: NodeJS.ReadableStream): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const chunks: Buffer[] = [];
			stream.on('data', (chunk: Buffer) => chunks.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
			stream.on('error', reject);
		});
	}
}
