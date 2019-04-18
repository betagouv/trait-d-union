const { expect, sinon } = require('../../tests/test-utils')
const createOffresPoleEmploiRepository = require('./offres-pole-emploi-repository')

describe('Offres Pole Emploi Repository', () => {
  describe('.getOffres({codeROME})', () => {
    const codeROME = 'codeROME'
    const offre = {
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
        'coordonnees2': 'RUE RUE DE L EMINEE',
        'coordonnees3': '63000 CLERMONT FERRAND',
        'nom': 'H PUB - M. PHILIPPE ARNALD'
      },
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
      'id': '086QKQK',
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
      'romeCode': 'G1801',
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

    const poleEmploiApiService = {
      request: sinon.spy(async () => {
        return { resultats: [offre] }
      })
    }
    const offresPoleEmploiRepository = createOffresPoleEmploiRepository({ poleEmploiApiService })

    it('requests poleEmploiApi', async () => {
      await offresPoleEmploiRepository.getOffres({ codeROME })

      expect(poleEmploiApiService.request).to.have.been.calledWith('/offres/search', {
        codeROME,
        range: '1-149',
        experience: 1,
        sort: 2,
        commune: 57463,
        distance: 10
      })
    })

    it('returns sanitized poleEmploiApi offres', async () => {
      const offres = await offresPoleEmploiRepository.getOffres({ codeROME })

      expect(offres).to.deep.equal([{
        id: '086QKQK',
        url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/086QKQK'
      }])
    })
  })
})
