// Custom Cypress commands for Meridian Banking Chatbot
// Note: POM (ChatPage) is now the primary abstraction for UI interactions.
// These commands are reserved for direct API calls not covered by the Page Object.

/**
 * Get conversation state from API
 * Usage: cy.getConversationState()
 */
Cypress.Commands.add("getConversationState", () => {
	const token = Cypress.env("CHATBOT_TOKEN");
	return cy.request({
		method: "GET",
		url: "https://2ndround.sandb0x.run/api/state",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
});

/**
 * Send message via API (not UI)
 * Usage: cy.sendMessageViaAPI('What is my balance?')
 */
Cypress.Commands.add("sendMessageViaAPI", (message: string) => {
	const token = Cypress.env("CHATBOT_TOKEN");
	return cy.request({
		method: "POST",
		url: "https://2ndround.sandb0x.run/api/chat",
		body: {
			message,
			token,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});
});

// Type definitions for custom commands
declare global {
	namespace Cypress {
		interface Chainable {
			getConversationState(): Chainable<
				Cypress.Response<Record<string, unknown>>
			>;
			sendMessageViaAPI(
				message: string,
			): Chainable<Cypress.Response<Record<string, unknown>>>;
		}
	}
}
