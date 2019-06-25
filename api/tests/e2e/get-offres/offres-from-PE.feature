Feature: Source offres around a given distance of a given location for which a formation session exists

  Scenario: One offre persisted
    Given Referentiel is seed from 'one-offre-from-PE'
    When POST '/offres/source'
    Then http status is 200
    And response payload is '/get-offres/GET_offres_one_result.json'

