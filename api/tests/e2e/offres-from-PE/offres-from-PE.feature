Feature: Source offres around a given distance of a given location for which a formation session exists

  Scenario: One offre found (JSON)
    Given Referentiel is seed from 'one-offre-from-PE'
    When POST '/offres/source'
    Then http status is 200
    And response payload is '/offres-from-PE/GET_offres_one_result.json'

  Scenario: One offre found (CSV)
    Given Referentiel is seed from 'one-offre-from-PE'
    When POST '/offres/source?format=csv'
    Then http status is 200
    And response payload is text equals to '/offres-from-PE/GET_offres_one_result.csv'
