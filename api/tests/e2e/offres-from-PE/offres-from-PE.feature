Feature: Retrieve offres around a given distance of a given location for which a formation session exists

  Scenario: One offre found
    Given Referentiel is seed from 'one-offre-from-PE'
    When GET '/offres'
    Then http status is 200
    And response payload is '/offres-from-PE/GET_offres_one_result_from_PE.json'
