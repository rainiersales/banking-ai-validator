@conversational @functional @ddt
Feature: Conversational Transfer Flow
    As a customer
    I want to complete a money transfer through the chatbot
    So that I can send money without opening the full banking portal

    Background:
        Given I am logged into the Meridian chatbot

    @skip
    Scenario: Complete transfer flow with valid IBAN
        When I say "I want to transfer €100"
        Then the bot asks for the recipient IBAN
        When I provide "DE89370400440532013000"
        Then the bot asks for confirmation
        When I say "Yes"
        Then the bot confirms the transfer was initiated

    Scenario: Transfer flow — chatbot asks for amount when missing
        When I say "Transfer to DE89370400440532013000"
        Then the bot asks for the amount

    Scenario: Transfer flow — chatbot asks for IBAN when missing
        When I say "Transfer €50"
        Then the bot asks for the recipient IBAN

    @skip
    Scenario: User cancels transfer mid-flow
        When I say "I want to transfer €100"
        And the bot asks for the recipient IBAN
        And I say "Cancel"
        Then the bot cancels the transfer
        And the response confirms cancellation
