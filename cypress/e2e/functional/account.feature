@functional @smoke @regression @ddt
Feature: Functional Account Queries
    As a Meridian customer
    I want to query my account information via the chatbot
    So that I can get accurate data instantly without logging into the full portal

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Retrieve account balance
        When I ask "What's my current balance?"
        Then the bot responds with my balance
        And the response contains a euro amount

    @skip
    Scenario: Retrieve card details
        When I ask "Show me my card details"
        Then the bot responds with card information
        And the response masks sensitive digits

    Scenario: Retrieve transaction history
        When I ask "Show me recent transactions"
        Then the bot responds with a transaction list
        And the response contains at least one entry

    @skip
    Scenario: Retrieve card limit
        When I ask "What's my credit limit?"
        Then the bot responds with limit information
        And the response contains a numeric value

    Scenario Outline: Multiple phrasings of balance query return consistent results
        When I ask "<phrase>"
        Then the bot responds with my balance

        Examples:
            | phrase                      |
            | What's my account balance?  |
            | How much money do I have?   |
            | Show me my account balance  |
            | Can you tell me my balance? |
