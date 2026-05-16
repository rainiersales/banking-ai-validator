@compatibility @ui @slow @regression
Feature: Device and Browser Compatibility
    As Meridian Bank
    I want the chatbot to work correctly across devices and browsers
    So that all customers can access it regardless of their setup

    Background:
        Given I navigate to the Meridian chatbot

    Scenario: Chat interface renders on desktop viewport
        Given the viewport is 1280x720 (desktop)
        When I click on Open Candidate Brief button
        And I open the chatbot
        Then the chat input and send button are visible

    Scenario: Chat interface renders on tablet viewport
        Given the viewport is 768x1024 (tablet)
        When I click on Open Candidate Brief button
        And I open the chatbot
        Then the chat input and send button are visible

    Scenario: Chat interface renders on mobile viewport
        Given the viewport is 375x667 (mobile)
        When I click on Open Candidate Brief button
        And I open the chatbot
        Then the chat input and send button are visible

    Scenario: Chatbot is usable on touch screen (mobile interaction)
        Given the viewport is 375x667 (mobile)
        When I click on Open Candidate Brief button
        And I open the chatbot
        And I tap the input field
        Then the keyboard opens and I can type
        And I can submit a message via the send button

    Scenario: Chat messages wrap correctly on narrow viewport
        Given the viewport is 320x568 (small mobile)
        When I am logged into the Meridian chatbot
        And I send a long message
        Then the message wraps and does not overflow the container
