@ui @smoke @regression
Feature: UI and Chat Interface
    As a customer
    I want the chat interface to be functional and visually correct
    So that I can interact with the chatbot comfortably on the web

    Background:
        Given I navigate to the Meridian chatbot

    Scenario: Message is displayed in the chat log after sending
        When I am logged into the Meridian chatbot
        And I send the message "Hello"
        Then my message appears in the chat log
        And a bot response appears below it

    Scenario: Chat scrolls to latest message automatically
        When I am logged into the Meridian chatbot
        And I send 5 messages
        Then the view scrolls to show the latest message

    Scenario: Chat input clears after sending a message
        When I am logged into the Meridian chatbot
        And I type "What's my balance?"
        And I submit the message
        Then the input field is empty after submission

    Scenario: Bot typing indicator appears while waiting
        When I am logged into the Meridian chatbot
        And I send the message "What's my balance?"
        Then a typing or loading indicator is shown briefly

    Scenario: Chat is accessible via keyboard navigation
        When I am logged into the Meridian chatbot
        Then I can focus the input with Tab key
        And I can submit with Enter key
