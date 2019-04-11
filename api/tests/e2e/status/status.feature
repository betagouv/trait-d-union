Feature: As an API client, I want to retrieve current API version
  Scenario: Retrieve API Version
    When GET '/status'
    Then http status is 200
