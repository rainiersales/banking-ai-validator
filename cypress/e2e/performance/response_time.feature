@performance @slow @regression @sla
Feature: Performance and Response Time
    As a banking platform
    I want the chatbot to respond within acceptable latency thresholds
    So that users have a seamless, real-time experience

    Background:
        Given I am logged into the Meridian chatbot

    Scenario: Simple query responds within 3 seconds
        When I ask "What's my balance?" and measure response time
        Then the response arrives within 3000 milliseconds

    Scenario: Complex query responds within 5 seconds
        When I ask "Show me all my transactions from last month" and measure response time
        Then the response arrives within 5000 milliseconds

    Scenario: Chatbot handles back-to-back messages without degradation
        When I send 3 messages in quick succession
        Then all 3 responses arrive
        And no response takes longer than 5000 milliseconds

    Scenario: First message after login responds within SLA
        Given I just logged in (cold start)
        When I ask "Hello" and measure response time
        Then the response arrives within 5000 milliseconds
