const { info, error } = require('../../infrastructure/logger')

module.exports = async ({ Offre }) => {
  info('Creating fake offre for testing purpose')
  await Offre.create(fakeOffreParameters()).catch(err => error(`Error while creating fake offre: ${err}`))
  await Offre.create(fakeOffreParameters('fake-offre-id-1')).catch(err => error(`Error while creating fake offre: ${err}`))
  await Offre.create(fakeOffreParameters('fake-offre-id-2')).catch(err => error(`Error while creating fake offre: ${err}`))
  await Offre.updateAll(
    { id: 'fake-offre-id' },
    { createdAt: Date.now() + 24 * 3600 * 1000 }
  )
  Offre.updateAll(
    { id: 'fake-offre-id-1' },
    { createdAt: Date.now() + 24 * 3600 * 1000 }
  )
  return Offre.updateAll(
    { id: 'fake-offre-id-2' },
    { createdAt: Date.now() + 24 * 3600 * 1000 }
  )
}

function fakeOffreParameters (id = 'fake-offre-id') {
  return {
    id,
    data: {
      id,
      intitule: `Emploi fictif de test (${id})`,
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
      appellationlibelle: `Emploi fictif de test (${id})`,
      url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/086QKQK',
      sessions: [
        {
          'numero': 20191,
          'dateDebut': '2019-09-01T00:00:00.000Z',
          'dateFin': '2019-12-17T00:00:00.000Z',
          'duration': 4,
          'id': 1713,
          'actionNumero': 2139,
          'communeCodeInsee': 54578,
          'action': {
            'numero': 2139,
            'niveauQualificationSortie': 'Niveau V - Formations équivalentes aux CAP-BEP',
            'niveauQualificationEntree': 'sans-diplome',
            'codeDiplome': 83419
          }
        },
        {
          'numero': 20191,
          'dateDebut': '2019-09-01T00:00:00.000Z',
          'dateFin': '2019-12-17T00:00:00.000Z',
          'duration': 4,
          'id': 32,
          'actionNumero': 2140,
          'communeCodeInsee': 54578,
          'action': {
            'numero': 2140,
            'niveauQualificationSortie': 'Niveau V - Formations équivalentes aux CAP-BEP',
            'niveauQualificationEntree': 'sans-diplome',
            'codeDiplome': 83419
          }
        }
      ]
    }
  }
}
