Feature: Status route
  In order to check server status
  As a API customer
  I want to get server version when requesting status

  Scenario: Non authenticated user can get status
    Given User is not authenticated
    When GET '/status'
    Then http status is 200
    And response payload conforms to 'statusSchema'
