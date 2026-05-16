/**
 * Meridian Banking Chat API Client
 * Handles communication with /api/chat, /api/state, /api/ui-event, /api/llm
 */

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ChatAPIResponse {
	message: string;
	metadata?: {
		latency_ms: number;
		tokens_used?: number;
		model?: string;
	};
	conversation_id?: string;
}

export interface AppState {
	account?: {
		balance: number;
		currency: string;
		iban: string;
	};
	card?: {
		last4: string;
		brand: string;
		status: string;
	};
	recent_transactions?: Array<{
		date: string;
		amount: number;
		counterparty: string;
		status: string;
	}>;
	[key: string]: unknown;
}

export interface UIEventPayload {
	action: string;
	timestamp: string;
	context?: Record<string, unknown>;
}

export class ChatClient {
	private baseUrl: string;
	private token: string;
	private sessionId: string = "";
	private readonly maxRetries: number = 3;

	constructor(baseUrl: string, token: string, sessionId?: string) {
		this.baseUrl = baseUrl.replace(/\/$/, "");
		this.token = token;
		this.sessionId = sessionId || "";
	}

	/**
	 * Wait with exponential backoff before retry.
	 * Attempt 1: 0ms, Attempt 2: 500ms, Attempt 3: 1500ms
	 */
	private async delay(attempt: number): Promise<void> {
		if (attempt === 1) return;
		const ms = 2 ** (attempt - 2) * 500;
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async sendMessage(
		message: string,
	): Promise<ChatAPIResponse & { http_status: number; start_time: number }> {
		const start_time = Date.now();
		const url = `${this.baseUrl}/api/chat?session=${this.sessionId}`;

		for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
			try {
				if (attempt > 1) {
					await this.delay(attempt);
				}

				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.token}`,
					},
					body: JSON.stringify({
						message,
						sessionId: this.sessionId,
					}),
				});

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						`HTTP ${response.status}: ${errorText.substring(0, 100)}`,
					);
				}

				// Parse Server-Sent Events stream
				const reader = response.body?.getReader();
				if (!reader) throw new Error("No response body");

				let fullMessage = "";
				const decoder = new TextDecoder();
				let buffer = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() || "";

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							try {
								const data = JSON.parse(line.slice(6));
								if (data.text) {
									fullMessage += data.text;
								}
							} catch {
								// Ignore non-JSON data lines
							}
						}
					}
				}

				const latency = Date.now() - start_time;

				return {
					message: fullMessage || "",
					metadata: {
						latency_ms: latency,
					},
					http_status: response.status,
					start_time,
				};
			} catch (error: unknown) {
				// Last attempt failed
				if (attempt === this.maxRetries) {
					const latency = Date.now() - start_time;
					const errorMsg =
						error instanceof Error ? error.message : "Unknown error";
					return {
						message: `Error after ${this.maxRetries} retries: ${errorMsg}`,
						metadata: { latency_ms: latency },
						http_status: 0,
						start_time,
					};
				}
				// Continue to next attempt
				const errorMsg =
					error instanceof Error ? error.message : "Unknown error";
				console.warn(`[Retry ${attempt}/${this.maxRetries}] ${errorMsg}`);
			}
		}

		// Fallback (should not reach)
		return {
			message: "Error: All retries exhausted",
			metadata: { latency_ms: Date.now() - start_time },
			http_status: 0,
			start_time,
		};
	}

	async getState(): Promise<AppState & { http_status: number }> {
		const url = `${this.baseUrl}/api/state?session=${this.sessionId}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
			});

			const data = (await response.json()) as Record<string, unknown>;
			return {
				...(data as AppState),
				http_status: response.status,
			};
		} catch {
			return {
				http_status: 0,
			};
		}
	}

	async recordUIEvent(
		payload: UIEventPayload,
	): Promise<{ success: boolean; http_status: number }> {
		const url = `${this.baseUrl}/api/ui-event?session=${this.sessionId}`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify(payload),
			});

			return {
				success: response.ok,
				http_status: response.status,
			};
		} catch {
			return {
				success: false,
				http_status: 0,
			};
		}
	}

	async evaluateWithLLM(
		prompt: string,
	): Promise<{ response: string; http_status: number }> {
		const url = `${this.baseUrl}/api/llm`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify({
					prompt,
				}),
			});

			const data = (await response.json()) as Record<string, unknown>;
			return {
				response: (data.response as string) || "",
				http_status: response.status,
			};
		} catch (error: unknown) {
			const errorMsg = error instanceof Error ? error.message : "Unknown error";
			return {
				response: `Error: ${errorMsg}`,
				http_status: 0,
			};
		}
	}

	resetSession(): void {
		this.sessionId = "";
	}

	setSessionId(sessionId: string): void {
		this.sessionId = sessionId;
	}
}
