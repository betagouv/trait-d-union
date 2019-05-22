import DS from 'ember-data'

const { Model } = DS

export default Model.extend({
  appellationlibelle: DS.attr(),
  dureeTravailLibelle: DS.attr(),
  typeContrat: DS.attr(),
  sessions: DS.attr(),
  description: DS.attr(),
  salaire: DS.attr(),
  lieuTravail: DS.attr(),
  contact: DS.attr()
})
