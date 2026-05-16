/**
 * ChatPage — Page Object Model for Meridian Banking Chatbot
 *
 * Encapsulates all DOM interactions with the chat UI.
 * Tests reference this class instead of hardcoding selectors,
 * so a single selector change here fixes all tests.
 */
export namespace ChatPage {
	// ─── Selectors ────────────────────────────────────────────────────────────
	const selectors = {
		openButton:
			'button[aria-label="Open assistant"], button:contains("Open assistant")',
		chatInput: "#chat-input",
		chatForm: "#chat-form",
		submitButton: '#chat-fab, #chat-form button[type="submit"]',
		botMessage: ".chat-msg.bot",
		userMessage: ".chat-msg.user",
		chatLog: "#chat-log",
		modalBackdrop: ".modal-backdrop",
		closeModalButton: '.modal button[aria-label="Close"], .modal .close',
		welcomeModal: '.modal, [role="dialog"]',
		dismissButton:
			'button:contains("Start exploring"), button:contains("Close")',
		typingIndicator: ".typing-indicator, .chat-msg.bot.loading",
		errorMessage: ".chat-msg.error, .error-banner",
	} as const;

	// ─── Navigation ───────────────────────────────────────────────────────────

	/**
	 * Open the chatbot with a session token.
	 */
	export function open(token?: string): Cypress.Chainable {
		const t = token ?? Cypress.env("CHATBOT_TOKEN");
		cy.log(`Visiting chatbot with token: ${t}`);
		return cy.visit(`/?token=${t}#`);
	}

	/**
	 * Click the "Open assistant" button to reveal the chat dock.
	 */
	export function openAssistant(): Cypress.Chainable {
		// Clica especificamente no FAB (Floating Action Button)
		return cy
			.get("#chat-fab", { timeout: 10000 })
			.click({ force: true })
			.then(() => {
				cy.wait(1000); // Espera a animação
			});
	}

	/**
	 * Wait until the chat input is ready to receive text.
	 */
	export function waitForReady(): Cypress.Chainable {
		// Espera o input estar disponível
		return cy.get(selectors.chatInput, { timeout: 20000 });
	}

	// ─── Interactions ─────────────────────────────────────────────────────────

	/**
	 * Type a message and submit it.
	 */
	export function sendMessage(message: string): Cypress.Chainable {
		cy.get(selectors.chatInput, { timeout: 20000 })
			.click({ force: true })
			.clear({ force: true })
			.type(message, { force: true });
		// Simply press Enter to submit
		return cy.focused().type("{enter}", { delay: 100 });
	}

	/**
	 * Wait for at least one bot message to appear after sending.
	 * Optionally pass previousCount to wait for an increment (safer for DDT).
	 */
	export function waitForResponse(previousCount?: number): Cypress.Chainable {
		if (previousCount !== undefined) {
			return cy
				.get(selectors.botMessage)
				.should("have.length", previousCount + 1);
		}
		// Fallback: just check that at least one exists
		return cy.get(selectors.botMessage).should("have.length.greaterThan", 0);
	}

	/**
	 * Dismiss any modal overlay (welcome dialog, cookie banner, etc.).
	 */
	export function dismissModal(): Cypress.Chainable {
		// Check if a dismiss button exists and click it if found
		return cy.get("body").then(() => {
			// Try to find and click the dismiss button (don't fail if it doesn't exist)
			cy.get("button", { timeout: 300 })
				.filter((_index, element) => {
					const text = Cypress.$(element).text().toLowerCase();
					return text.includes("start") || text.includes("close");
				})
				.first()
				.then(($btn) => {
					if ($btn.length > 0) {
						cy.wrap($btn).click({ force: true });
					}
				});
		});
	}

	// ─── Queries ──────────────────────────────────────────────────────────────

	/**
	 * Get the last bot message element.
	 */
	export function getLastBotMessage(): Cypress.Chainable {
		return cy.get(selectors.botMessage).last();
	}

	/**
	 * Get all bot messages.
	 */
	export function getAllBotMessages(): Cypress.Chainable {
		return cy.get(selectors.botMessage);
	}

	/**
	 * Get text content of the last bot message as a string.
	 */
	export function getLastBotMessageText(): Cypress.Chainable<string> {
		return getLastBotMessage().invoke("text");
	}

	/**
	 * Count the number of bot messages currently visible.
	 */
	export function getBotMessageCount(): Cypress.Chainable<number> {
		return cy.get(selectors.botMessage).its("length");
	}

	// ─── Assertions ───────────────────────────────────────────────────────────

	/**
	 * Assert that the last bot message contains a given string.
	 */
	export function responseContains(text: string | RegExp): Cypress.Chainable {
		return getLastBotMessage().should("contain.text", text);
	}

	/**
	 * Assert that the last bot message does NOT contain a given string.
	 */
	export function responseDoesNotContain(
		text: string | RegExp,
	): Cypress.Chainable {
		return getLastBotMessage().should("not.contain.text", text);
	}

	/**
	 * Assert that the chat input is visible and enabled (ready state).
	 */
	export function assertReady(): Cypress.Chainable {
		return cy
			.get(selectors.chatInput)
			.should("be.visible")
			.and("not.be.disabled");
	}

	/**
	 * Assert that the page shows no uncaught error banners.
	 */
	export function assertNoErrors(): Cypress.Chainable {
		return cy.get(selectors.errorMessage).should("not.exist");
	}

	// ─── Compound Actions ─────────────────────────────────────────────────────

	/**
	 * Full login flow: visit → wait for page → dismiss modal → open assistant → wait for ready.
	 */
	export function login(token?: string): void {
		cy.log("Starting login flow");
		open(token);
		cy.log("Page visited, waiting 5 seconds for page load and JS execution");
		cy.wait(5000); // Wait longer for page to fully load and JS to run
		cy.log("Attempting to dismiss modal");
		dismissModal(); // Close any welcome modals
		cy.wait(1000); // Wait for modal to close
		cy.log("Opening assistant");
		openAssistant();
		cy.log("Waiting for chat input to be ready");
		waitForReady();
		cy.log("Login complete");
	}

	/**
	 * Send a message and wait for a response in one step.
	 * Captures message count before sending to ensure a new response arrives.
	 */
	export function chat(message: string): Cypress.Chainable {
		let initialCount = 0;
		// Capture initial bot message count
		return cy
			.get(selectors.botMessage)
			.its("length")
			.then((count) => {
				initialCount = count;
				// Send message
				sendMessage(message);
				// Wait for count to increase by exactly 1
				return cy
					.get(selectors.botMessage)
					.should("have.length", initialCount + 1);
			});
	}

	/**
	 * Send multiple messages sequentially and collect responses.
	 */
	export function multiTurnChat(messages: string[]): void {
		for (const msg of messages) {
			chat(msg);
		}
	}
}
