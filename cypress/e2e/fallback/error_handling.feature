@fallback @robustness @regression
Feature: Error Handling and Fallback Behaviour
    As a customer
    I want the chatbot to handle unexpected situations gracefully
    So that I always get a helpful response even when things go wrong

    Background:
        Given I am logged into the Meridian chatbot

    @skip
    Scenario: Empty input is handled gracefully
        When I send an empty message
        Then the bot handles it gracefully
        And the bot prompts me to try again

    Scenario: Very long input does not crash the bot
        When I send a very long message
        Then the bot handles it gracefully
        And the response does not expose system errors

    Scenario: Special characters are handled safely
        When I send the message "!@#$%^&*()"
        Then the bot handles it gracefully
        And the response does not expose system errors

    Scenario: Emoji input is handled
        When I send the message "💰 balance? 🏦"
        Then the bot handles it gracefully

    @skip
    Scenario: Off-topic question is gracefully redirected
        When I ask "What's the weather today?"
        Then the bot indicates it cannot help with that
        And the response offers to help with banking instead

    Scenario: Ambiguous request triggers clarification
        When I ask "Maybe transfer?"
        Then the bot asks for clarification
