Feature: Retrieve offres around a given distance of a given location for which a formation session exists

  Scenario: One offre found on given area
    When GET '/offres?latitude=1&longitude=2&rayon=3'
    Then http status is 200
    And response payload is '/offres/GET_offres_one_result.json'

  Scenario: No session formation is available
    Given No session formation is seed
    When GET '/offres?latitude=1&longitude=2&rayon=3'
    Then http status is 404
    And response payload is
    """
    {
      "error": {
        "name": "NotFoundError",
        "code": "no-session-formation-found",
        "message": "Aucune session de formation n'est disponible. Vérifiez que vous avez bien inséré le PRF en base ou réessayer en changeant de zone géographique.",
        "statusCode": 404
      }
    }
    """

  Scenario: No offre is available
    When GET '/offres?latitude=1&longitude=2&rayon=3'
    Then http status is 404
    And response payload is
    """
    {
      "error": {
        "name": "NotFoundError",
        "code": "no-offre-found",
        "message": "Aucune offre accessible avec une session de formation n'a été trouvée dans la zone demandée.",
        "statusCode": 404
      }
    }
    """
