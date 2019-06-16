const { expect, sinon } = require('../../../tests/test-utils')
const createOffresPoleEmploiRepository = require('./offres-pole-emploi-repository')

describe('Offres Pole Emploi Repository', () => {
  describe('.getOffres([codeROME])', () => {
    const codeROME = 'codeROME'
    let offre, poleEmploiApiService, offresPoleEmploiRepository

    beforeEach(() => {
      offre = createFullOffre()
      poleEmploiApiService = {
        request: sinon.spy(async () => {
          return { resultats: [offre] }
        })
      }
      offresPoleEmploiRepository = createOffresPoleEmploiRepository({ poleEmploiApiService })
    })

    it('requests poleEmploiApi', async () => {
      await offresPoleEmploiRepository.getOffres([codeROME])

      expect(poleEmploiApiService.request).to.have.been.calledWith('/offresdemploi/v2/offres/search', {
        codeROME: codeROME,
        range: '1-149',
        experience: 1,
        sort: 2,
        commune: 57463,
        distance: 10,
        typeContrat: 'CDI,CDD'
      })
    })

    context('when offer contains an undefined property', async () => {
      ['id', 'description', 'dureeTravailLibelle', 'secteurActiviteLibelle', 'lieuTravail',
        'appellationlibelle', 'salaire', 'permis', 'natureContrat', 'typeContrat'].forEach((undefinedProperty) => {
        const expectedOffre = createExpectedOffre()
        const fullOffre = createFullOffre()
        it(`returns sanitized poleEmploiApi offres without ${undefinedProperty}`, async () => {
          delete fullOffre[undefinedProperty]
          poleEmploiApiService.request = sinon.spy(async () => {
            return { resultats: [fullOffre] }
          })
          delete expectedOffre[undefinedProperty]
          const offres = await offresPoleEmploiRepository.getOffres([codeROME])

          expect(offres).to.deep.equal([expectedOffre])
        })
      })
    })

    it('returns sanitized poleEmploiApi offres', async () => {
      const offres = await offresPoleEmploiRepository.getOffres([codeROME])

      expect(offres).to.deep.equal([createExpectedOffre()])
    })

    context('when there are three codesROME', () => {
      it('requests poleEmploiApi', async () => {
        const codesROME = ['premier', 'deuxieme', 'troisieme']
        await offresPoleEmploiRepository.getOffres(codesROME)

        expect(poleEmploiApiService.request).to.have.been.calledWith('/offresdemploi/v2/offres/search', {
          codeROME: 'premier,deuxieme,troisieme',
          range: '1-149',
          experience: 1,
          sort: 2,
          commune: 57463,
          distance: 10,
          typeContrat: 'CDI,CDD'
        })
      })
    })

    context('when there are more than three codesROME', () => {
      const codesROME = ['premier', 'deuxieme', 'troisieme', 'quatrieme', 'cinquieme', 'sixieme']
      beforeEach(() => {
        poleEmploiApiService = { request: sinon.stub() }
        poleEmploiApiService.request.onFirstCall().returns({ resultats: [createFullOffre('1')] })
        poleEmploiApiService.request.onSecondCall().returns({ resultats: [createFullOffre('2')] })
        offresPoleEmploiRepository = createOffresPoleEmploiRepository({ poleEmploiApiService })
      })

      it('requests poleEmploiApi twice, grouping codesROME by 3', async () => {
        await offresPoleEmploiRepository.getOffres(codesROME)

        expect(poleEmploiApiService.request).to.have.been.calledWith('/offresdemploi/v2/offres/search', {
          codeROME: 'premier,deuxieme,troisieme',
          range: '1-149',
          experience: 1,
          sort: 2,
          commune: 57463,
          distance: 10,
          typeContrat: 'CDI,CDD'
        })

        expect(poleEmploiApiService.request).to.have.been.calledWith('/offresdemploi/v2/offres/search', {
          codeROME: 'quatrieme,cinquieme,sixieme',
          range: '1-149',
          experience: 1,
          sort: 2,
          commune: 57463,
          distance: 10,
          typeContrat: 'CDI,CDD'
        })
      })

      it('returns sanitized poleEmploiApi offres', async () => {
        const offres = await offresPoleEmploiRepository.getOffres(codesROME)

        expect(offres).to.deep.equal([createExpectedOffre('1'), createExpectedOffre('2')])
      })
    })
  })
})

function createFullOffre (id = '086QKQK') {
  return {
    'accessibleTH': false,
    'alternance': false,
    'appellationlibelle': 'Serveur / Serveuse de bar',
    'competences': [
      {
        'code': '101901',
        'exigence': 'S',
        'libelle': 'Accueillir le client et l\'installer'
      },
      {
        'code': '124015',
        'exigence': 'S',
        'libelle': 'Débarrasser une table'
      },
      {
        'code': '104304',
        'exigence': 'S',
        'libelle': 'Prendre la commande des clients'
      },
      {
        'code': '124961',
        'exigence': 'S',
        'libelle': 'Préparer des boissons chaudes ou froides'
      },
      {
        'code': '124962',
        'exigence': 'S',
        'libelle': 'Réaliser un service au bar'
      },
      {
        'code': '124963',
        'exigence': 'S',
        'libelle': 'Réaliser un service en salle'
      }
    ],
    'contact': {
      'coordonnees1': 'Courriel : philippe@entreprise.fr',
      'coordonnees2': 'RUE RUE DE L EMINEE',
      'coordonnees3': '63000 CLERMONT FERRAND',
      'nom': 'H PUB - M. PHILIPPE ARNALD'
    },
    'permis': [
      {
        'exigence': 'E',
        'libelle': 'B - Véhicule léger Exigé'
      },
      {
        'exigence': 'X',
        'libelle': 'Autre - B - Véhicule léger Exigé'
      }
    ],
    'dateActualisation': '2019-04-15T16:45:13+02:00',
    'dateCreation': '2019-04-15T16:45:10+02:00',
    // eslint-disable-next-line max-len
    'description': 'Nous recherchons un serveur(se) (H/F) CDI à temps plein 39H hebdomadaire pour le service du soir.\nMissions\n- Accueillir les clients et les installer\n- Présenter la carte et prendre la commande\n- Servir les plats et boissons\n- S\'assurer du bon déroulement du service\n- Encaissement\nProfil \n- Créer une relation avec les clients\n- Travailler en équipe\n- Dynamique et motivé(e)\nRémunération en fonction de l\'expérience.\nPoste à pourvoir immédiatement.',
    'dureeTravailLibelle': '39H Horaires normaux',
    'entreprise': {
      'nom': 'H PUB'
    },
    'experienceExige': 'D',
    'experienceLibelle': 'Débutant accepté',
    'formations': [],
    id,
    'intitule': 'Serveur/Serveuse (H/F)',
    'langues': [],
    'lieuTravail': {
      'codePostal': '63000',
      'latitude': 45.77972222,
      'libelle': '63 - CLERMONT FERRAND',
      'longitude': 3.086944444
    },
    'natureContrat': 'Contrat travail',
    'nombrePostes': 1,
    'origineOffre': {
      'origine': '1',
      'partenaires': [],
      'urlOrigine': 'https://candidat.pole-emploi.fr/offres/recherche/detail/086QKQK'
    },
    'qualificationCode': '6',
    'qualitesProfessionnelles': [
      {
        // eslint-disable-next-line max-len
        'description': 'Capacité à s’adapter à des situations variées et à s’ajuster à des organisations, des collectifs de travail, des habitudes et des valeurs propres à l’entreprise. Exemple : être souple, agile, s’adapter à une situation imprévue',
        'libelle': 'Capacité d’adaptation'
      },
      {
        // eslint-disable-next-line max-len
        'description': 'Capacité à planifier, à prioriser, à anticiper des actions en tenant compte des moyens, des ressources, des objectifs et du calendrier pour les réaliser. Exemple : planifier, ordonner ses actions par priorité',
        'libelle': 'Sens de l’organisation'
      },
      {
        // eslint-disable-next-line max-len
        'description': 'Capacité à réagir rapidement face à des évènements et à des imprévus, en hiérarchisant les actions, en fonction de leur degré d’urgence / d’importance. Exemple : faire preuve de dynamisme, vivacité, énergie, comprendre vite',
        'libelle': 'Réactivité'
      }
    ],
    'romeCode': 'codeROME',
    'romeLibelle': 'Café, bar brasserie',
    'salaire': {
      'libelle': 'Horaire de 10.03 Euros à 12.00 Euros sur 12 mois'
    },
    'secteurActivite': '56',
    'secteurActiviteLibelle': 'Restauration traditionnelle',
    'trancheEffectifEtab': '20 à 49 salariés',
    'typeContrat': 'CDI',
    'typeContratLibelle': 'Contrat à durée indéterminée'
  }
}

function createExpectedOffre (id = '086QKQK') {
  return {
    id,
    'intitule': 'Serveur/Serveuse (H/F)',
    'codeROME': 'codeROME',
    'source': 'pole-emploi',
    // eslint-disable-next-line max-len
    'description': 'Nous recherchons un serveur(se) (H/F) CDI à temps plein 39H hebdomadaire pour le service du soir.\nMissions\n- Accueillir les clients et les installer\n- Présenter la carte et prendre la commande\n- Servir les plats et boissons\n- S\'assurer du bon déroulement du service\n- Encaissement\nProfil \n- Créer une relation avec les clients\n- Travailler en équipe\n- Dynamique et motivé(e)\nRémunération en fonction de l\'expérience.\nPoste à pourvoir immédiatement.',
    'dureeTravailLibelle': '39H Horaires normaux',
    'lieuTravail': {
      'codePostal': '63000',
      'latitude': 45.77972222,
      'libelle': '63 - CLERMONT FERRAND',
      'longitude': 3.086944444
    },
    'natureContrat': 'Contrat travail',
    'permis': [
      {
        'exigence': 'E',
        'libelle': 'B - Véhicule léger Exigé'
      }
    ],
    'salaire': {
      'libelle': 'Horaire de 10.03 Euros à 12.00 Euros sur 12 mois'
    },
    'contact': {
      courriel: 'philippe@entreprise.fr',
      coordonnees1: 'Courriel : philippe@entreprise.fr',
      coordonnees2: 'RUE RUE DE L EMINEE',
      coordonnees3: '63000 CLERMONT FERRAND',
      nom: 'H PUB - M. PHILIPPE ARNALD'
    },
    'secteurActiviteLibelle': 'Restauration traditionnelle',
    'typeContrat': 'CDI',
    'appellationlibelle': 'Serveur / Serveuse de bar',
    'url': 'https://candidat.pole-emploi.fr/offres/recherche/detail/086QKQK'
  }
}
