Feature: Source offres around a given distance of a given location for which a formation session exists

  Scenario: One offre found with 4 sessions (JSON)
    Given Referentiel is seed from 'one-offre-from-PE-with-4-sessions'
    When POST '/offres/source'
    Then http status is 200
    And response payload is '/source-offres-from-PE-4-sessions/POST_offres_one_result.json'
