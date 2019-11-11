const nock = require('nock')
const API_BASE_URL = 'https://api.emploi-store.fr/partenaire'
const poleEmploiAPI = nock(API_BASE_URL)
const AUTHENT_API_BASE_URL = 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token'
const poleEmploiAuthentApi = nock(AUTHENT_API_BASE_URL)

exports.set = () => {
  poleEmploiAuthentApi
    .post('')
    .query({
      realm: '/partenaire',
      grant_type: 'client_credentials',
      client_id: 'clientId',
      client_secret: 'clientSecret',
      scope: 'api_labonneboitev1 api_offresdemploiv2 application_clientId o2dsoffre'
    })
    .reply(200, {
      scope: 'api_offresdemploiv2 o2dsoffre',
      expires_in: 1500,
      token_type: 'Bearer',
      access_token: 'api_key'
    })
    .persist()

  poleEmploiAPI
    .get('/offresdemploi/v2/offres/search')
    .query({
      range: '1-149',
      experience: 1,
      experienceExigence: 'D',
      sort: 2,
      codeROME: 'metier-avec-une-seule-offre-from-PE',
      distance: 10,
      commune: 57463,
      typeContrat: 'CDI,CDD'
    })
    .matchHeader('Authorization', 'Bearer api_key')
    .reply(200, {
      resultats: [
        {
          accessibleTH: false,
          agence: {
            courriel: 'laurence.montaigu@pole-emploi.fr'
          },
          alternance: false,
          appellationlibelle: 'Attaché commercial / Attachée commerciale en clientèle d\'entreprises',
          competences: [
            {
              code: '120146',
              exigence: 'S',
              libelle: 'Conseiller une clientèle ou un public'
            },
            {
              code: '102318',
              exigence: 'S',
              // eslint-disable-next-line max-len
              libelle: 'Définir le plan d\'action commercial et établir le plan de tournée (ciblage, interlocuteurs, préparation de dossiers techniques)'
            },
            {
              code: '121759',
              exigence: 'S',
              libelle: 'Effectuer une démonstration devant un client ou un public'
            },
            {
              code: '117344',
              exigence: 'S',
              libelle: 'Elaborer des propositions commerciales'
            },
            {
              code: '121417',
              exigence: 'S',
              libelle: 'Méthodes de plan de prospection'
            }
          ],
          contact: {
            coordonnees1: '15 RUE des artisans\nBP 20138',
            coordonnees2: '57300 HAGONDANGE',
            coordonnees3: 'Courriel : laurence.montaigu@pole-emploi.fr',
            nom: 'Pôle Emploi HAGONDANGE'
          },
          dateActualisation: '2019-05-03T09:20:29+02:00',
          dateCreation: '2018-10-19T14:53:11+02:00',
          deplacementCode: '4',
          deplacementLibelle: 'Quotidiens Départemental',
          // eslint-disable-next-line max-len
          description: 'le leader du déménagements souhaite renforcer sa force de vente . vous effectuerez de la prospection et le développement de la clientèle uniquement de professionnel. Fichier existant et à développer.\nvous interviendrez sur THIONVILLE /METZ/NANCY\nVéhicule fourni et frais pris en charge. salaire attractif\naccepte débutant qui souhaite s\'épanouir dans ce métier.\n',
          dureeTravailLibelle: '35H Horaires normaux',
          experienceExige: 'D',
          experienceLibelle: 'Débutant accepté',
          formations: [],
          id: '079DBQT',
          intitule: 'Attaché commercial / Attachée commerciale en clientèle d\'entreprises',
          langues: [],
          lieuTravail: {
            codePostal: '57000',
            commune: '57463',
            latitude: 49.11972222,
            libelle: '57 - secteur de METZ',
            longitude: 6.176944443
          },
          natureContrat: 'Contrat travail',
          nombrePostes: 1,
          origineOffre: {
            origine: '1',
            partenaires: [],
            urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/079DBQT'
          },
          permis: [
            {
              exigence: 'E',
              libelle: 'B - Véhicule léger Exigé'
            }
          ],
          qualificationCode: '6',
          romeCode: 'metier-avec-une-seule-offre-from-PE',
          romeLibelle: 'Relation commerciale grands comptes et entreprises',
          salaire: {
            commentaire: 'fixe + prime sur CA',
            complement1: 'fixe + prime sur CA'
          },
          secteurActivite: '49',
          secteurActiviteLibelle: 'Services de déménagement',
          trancheEffectifEtab: '20 à 49 salariés',
          typeContrat: 'CDI',
          typeContratLibelle: 'Contrat à durée indéterminée'
        }]
    })
    .persist()

  poleEmploiAPI
    .get('/offresdemploi/v2/offres/search')
    .query({
      range: '1-149',
      experience: 1,
      sort: 2,
      codeROME: 'metier-avec-une-seule-offre-from-LBB',
      distance: 10,
      commune: 57463,
      typeContrat: 'CDI,CDD'
    })
    .matchHeader('Authorization', 'Bearer api_key')
    .reply(200, {
      resultats: []
    })
    .persist()

  poleEmploiAPI
    .get('/labonneboite/v1/company')
    .query({
      commune_id: 57463,
      rome_codes: 'metier-avec-une-seule-offre-from-LBB',
      distance: 10,
      page_size: 100
    })
    .matchHeader('Authorization', 'Bearer api_key')
    .reply(200, {
      companies: [
        {
          address: 'Service des ressources humaines, 3 BOULEVARD PAIXHANS, 57000 METZ',
          alternance: false,
          boosted: false,
          city: 'METZ',
          contact_mode: 'Envoyer un CV et une lettre de motivation',
          distance: 1.4,
          headcount_text: '200 à 249 salariés',
          lat: 49.1207,
          lon: 6.18389,
          matched_rome_code: 'metier-avec-une-seule-offre-from-LBB',
          matched_rome_label: 'Conduite d\'engins agricoles et forestiers',
          matched_rome_slug: 'conduite-d-engins-agricoles-et-forestiers',
          naf: '0220Z',
          naf_text: 'Exploitation forestière',
          name: 'AGENCE DE METZ',
          siret: '66204311602105',
          social_network: '',
          stars: 2.5,
          // eslint-disable-next-line max-len
          url: 'https://labonneboite.pole-emploi.fr/66204311602105/details?rome_code=A1101&utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__test'
        }
      ],
      companies_count: 1,
      rome_code: 'A1101',
      rome_label: 'Conduite d\'engins agricoles et forestiers',
      // eslint-disable-next-line max-len
      url: 'https://labonneboite.pole-emploi.fr/entreprises/commune/57463/rome/A1101?utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__test&from=1&to=2&sort=score&d=10&h=1'
    })

  poleEmploiAPI
    .get('/labonneboite/v1/company')
    .query({
      commune_id: 57463,
      rome_codes: 'metier-avec-une-seule-offre-from-PE',
      distance: 10,
      page_size: 100
    })
    .matchHeader('Authorization', 'Bearer api_key')
    .reply(200, {
      companies: []
    })
}
