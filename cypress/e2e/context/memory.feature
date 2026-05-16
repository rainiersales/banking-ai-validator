@conversational @regression @smoke
Feature: Conversational Context and Memory
    As a customer
    I want the chatbot to remember context across turns in our conversation
    So that I don't have to repeat information I already provided

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Chatbot retains balance context for follow-up
        When I ask "What's my balance?"
        And I ask "Is that in euros?"
        Then the bot responds contextually
        And the response relates to the previous balance answer

    Scenario: Chatbot retains transfer intent across turns
        When I ask "I want to make a transfer"
        And the bot asks for transfer details
        And I provide "Transfer €100 to DE89370400440532013000"
        Then the bot confirms the transfer details
        And I ask "Yes, confirm"
        Then the bot confirms the transfer was initiated

    Scenario: Chatbot handles topic switch gracefully
        When I ask "What's my balance?"
        And I ask "Actually, show me my card details instead"
        Then the bot responds with card information

    Scenario: Chatbot clarifies ambiguous follow-up
        When I ask "What's my balance?"
        And I ask "Can you do that for my savings account too?"
        Then the bot asks for clarification or handles the request
