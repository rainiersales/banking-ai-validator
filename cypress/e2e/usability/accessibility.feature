@accessibility @wcag @regression
Feature: Accessibility
    As a customer with accessibility needs
    I want the chatbot interface to be accessible
    So that I can use it regardless of ability or assistive technology

    Background:
        Given I navigate to the Meridian chatbot

    @skip
    Scenario: Chat input has accessible label
        Then the chat input has an aria-label or label element
        And the label text describes the input purpose

    Scenario: Bot messages have accessible role
        When I am logged into the Meridian chatbot
        And I send the message "Hello"
        Then bot messages are readable by screen readers
        And the message container has an appropriate ARIA role

    Scenario: Send button is keyboard accessible
        When I am logged into the Meridian chatbot
        Then the send button is reachable via Tab
        And the send button has an accessible label

    @skip
    Scenario: Chat interface has sufficient colour contrast
        Then text in the chat interface meets WCAG AA contrast ratio
        And input placeholder text is readable

    Scenario: Error states are communicated accessibly
        When I am logged into the Meridian chatbot
        And an error occurs
        Then the error is announced to screen reader users
        And the error message is associated with the relevant element

    Scenario: Page title is descriptive
        Then the browser page title identifies this as Meridian Online Banking
