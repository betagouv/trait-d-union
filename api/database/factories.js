const app = require('../server/server')

app.seeder.createFactory('Formation', {
  'exercice': '{{random.number}}',
  'numero': 2,
  'intitule': '{{lorem.sentence}}',
  'modalite_intervention': 'modalite_intervention',
  'date_debut': '{{date.recent}}',
  'date_fin': '{{date.recent}}',
  'statut': 'statut',
  'code_diplome': 'code_diplome',
  'commune': '{{address.city}}',
  'localisation': '{{address.latitude}},{{address.longitude}}'
})
