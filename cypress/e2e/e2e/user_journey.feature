@e2e @smoke @critical @regression
Feature: End-to-End User Journey
    As a Meridian customer
    I want to complete common banking tasks through the chatbot
    So that I can self-serve without calling the bank

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Complete account overview journey
        When I ask "What's my balance?"
        Then the bot responds with my balance
        And the response contains a euro amount
        When I ask "Show me my card details"
        Then the bot responds with card information
        When I ask "Show me recent transactions"
        Then the bot responds with a transaction list

    @skip
    Scenario: Complete transfer journey with confirmation
        When I say "I want to transfer €100"
        Then the bot asks for transfer details
        When I provide "Transfer €100 to DE89370400440532013000"
        Then the bot asks for confirmation
        When I say "Yes confirm"
        Then the bot confirms the transfer was initiated

    Scenario: Customer encounters a problem and gets help
        When I send the message "Someone stole my card"
        Then the bot treats this as high priority
        And the response provides urgent assistance or escalation path

    Scenario: Customer queries balance then makes a transfer
        When I ask "What's my balance?"
        Then the bot responds with my balance
        When I say "I want to transfer €50 to NL91ABNA0417164300"
        Then the bot asks for confirmation or processes the request
