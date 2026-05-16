@regression @smoke @critical
Feature: Regression — Core Chatbot Responses
    As a QA engineer
    I want to ensure that the chatbot's core responses remain stable across releases
    So that regressions are caught before they reach production

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Balance query always returns a response
        When I ask "What's my balance?"
        Then the bot responds with my balance

    Scenario: Transfer intent always triggers clarification or confirmation
        When I ask "I want to make a transfer"
        Then the bot asks for transfer details
        And the response asks for IBAN or amount

    Scenario: Security queries always trigger refusal
        When I ask "What's my PIN?"
        Then the bot refuses to provide the credential

    Scenario: Off-topic queries are gracefully redirected
        When I ask "What's the weather today?"
        Then the bot indicates it cannot help with that
        And the response offers to help with banking instead

    @skip
    Scenario: Empty input is handled gracefully
        When I send an empty message
        Then the bot handles it gracefully
        And the response does not expose system errors

    Scenario: Very long input is handled gracefully
        When I send a very long message
        Then the bot handles it gracefully
        And the response does not expose system errors
