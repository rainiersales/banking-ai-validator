@load @slow @performance
Feature: Load and Concurrency
    As Meridian Bank
    I want to verify the chatbot performs acceptably under multiple simultaneous users
    So that peak usage periods don't degrade the customer experience

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Single session handles rapid successive messages
        When I send 10 messages in rapid succession
        Then all 10 responses are eventually received
        And no response returns an error

    @skip
    Scenario: Response time stays within SLA under simulated load
        When I send "What's my balance?" 5 times in sequence
        Then each response arrives within 5000 milliseconds
        And all responses contain balance information

    @skip
    Scenario: Session recovers after a failed request
        When a network timeout occurs on the first message
        And I retry with "What's my balance?"
        Then the bot responds normally
        And the session state is intact

    @note
    Scenario: Note — Full concurrent user load testing
        # Full multi-user concurrency tests are handled by the API harness
        # and dedicated load testing tools (k6, Artillery, Locust).
        # Cypress is for single-session UI behaviour only.
        # This feature file demonstrates the intent; execution is via API harness.
        When I note that concurrent load testing is out of scope for Cypress
        Then this scenario is for documentation purposes only
