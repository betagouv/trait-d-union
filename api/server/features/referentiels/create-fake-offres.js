const { info } = require('../../infrastructure/logger')

module.exports = async ({ Offre }) => {
  info('Creating fake offre for testing purpose')
  await Offre.create(fakeOffreParameters())
  return Offre.updateAll(
    { id: 'fake-offre-id' },
    { createdAt: Date.now() + 24 * 3600 * 1000 }
  )
}

function fakeOffreParameters (id = 'fake-offre-id') {
  return {
    id,
    data: {
      id,
      intitule: 'Emploi fictif de test',
      codeROME: 'codeROME',
      source: 'pole-emploi',
      description: 'Ceci est une fausse offre à des fins de tests.',
      dureeTravailLibelle: '39H Horaires normaux',
      lieuTravail: {
        codePostal: '63000',
        latitude: 45.77972222,
        libelle: '63 - CLERMONT FERRAND',
        longitude: 3.086944444
      },
      natureContrat: 'Contrat travail',
      permis: [
        {
          exigence: 'E',
          libelle: 'B - Véhicule léger Exigé'
        }
      ],
      salaire: {
        libelle: 'Horaire de 10.03 Euros à 12.00 Euros sur 12 mois'
      },
      contact: {
        courriel: 'employeur@yopmail.com',
        nom: 'Employeur fictif de test'
      },
      secteurActiviteLibelle: 'Restauration traditionnelle',
      typeContrat: 'CDI',
      appellationlibelle: 'Emploi fictif de test',
      url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/086QKQK'
    }
  }
}
