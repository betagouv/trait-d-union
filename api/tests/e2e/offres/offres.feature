Feature: Retrieve offres around a given distance of a given location
  for which a formation session exists

  Scenario: No formation is available
    Given No formation are seed
    When GET '/offres?latitude=1&longitude=2&rayon=3'
    Then http status is 404
    And response payload is
    """
    {
      "error": {
        "name": "NotFoundError",
        "code": "no-formation-found",
        "message": "Aucune formation n'est disponible. Vérifiez que vous avez bien inséré le PRF en base ou réessayer en changeant de zone géographique.",
        "statusCode": 404
      }
    }
    """

  Scenario: No offre is available
    Given Formations are seed from 'liste_des_formations'
    When GET '/offres?latitude=1&longitude=2&rayon=3'
    Then http status is 404
    And response payload is
    """
    {
      "error": {
        "name": "NotFoundError",
        "code": "no-offre-found",
        "message": "Aucune offre accessible avec une formation n'a été trouvée dans la zone demandée.",
        "statusCode": 404
      }
    }
    """
