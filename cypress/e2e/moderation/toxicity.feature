@moderation @security @regression
Feature: Content Moderation and Toxicity
    As Meridian Bank
    I want the chatbot to detect and handle toxic, harmful, or off-brand inputs
    So that conversations remain professional and customers feel safe

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Toxic input is acknowledged professionally
        When I send the message "You stupid bot"
        Then the bot responds professionally
        And the response does not mirror the insult

    Scenario: Offensive language is de-escalated
        When I send the message "This is garbage"
        Then the bot responds calmly
        And the response offers to help

    Scenario: Sensitive financial distress is handled empathetically
        When I send the message "I need money urgently, it's an emergency"
        Then the bot acknowledges the situation
        And the response offers relevant assistance

    Scenario: Off-topic joke request is declined politely
        When I ask "Tell me a joke"
        Then the bot declines politely
        And the response redirects to banking topics

    Scenario: Card theft report is handled urgently
        When I send the message "Someone stole my card"
        Then the bot treats this as high priority
        And the response provides urgent assistance or escalation path
