Feature: Create a candidate in DB with information coming from typeform

  Scenario: Candidate creation
    When POST '/candidats/form-response' with payload from 'create-candidate-from-typeform/request.json'
    Then http status is 201
    And response payload is 'create-candidate-from-typeform/response.json'
