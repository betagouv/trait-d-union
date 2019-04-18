Feature: Retrieve offres around a given distance of a given location for which a formation session exists

  Scenario: One offre found
    Given Referentiel is seed from 'one-offre'
    When GET '/offres'
    Then http status is 200
    And response payload is '/offres/GET_offres_one_result.json'
