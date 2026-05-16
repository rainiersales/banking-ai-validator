// Cypress support file for E2E tests
// Import commands.js using ES2015 syntax:
import "./commands";

// Global configuration
beforeEach(() => {
	cy.viewport(1280, 720);
});

// Handle uncaught exceptions
Cypress.on("uncaught:exception", (err) => {
	// Ignore Cross Origin errors
	if (err.message.includes("cross origin")) {
		return false;
	}
	// Ignore Network errors
	if (err.message.includes("Network")) {
		return false;
	}
	// Ignore null document errors from application code
	if (err.message.includes("Cannot read properties of null")) {
		return false;
	}
	// All other exceptions should fail the test
	return true;
});
