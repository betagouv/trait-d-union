import DS from 'ember-data'
import { computed } from '@ember/object'

const { Model } = DS

export default Model.extend({
  appellationlibelle: DS.attr(),
  dureeTravailLibelle: DS.attr(),
  typeContrat: DS.attr(),
  sessions: DS.attr(),
  description: DS.attr(),
  salaire: DS.attr(),
  lieuTravail: DS.attr(),
  contact: DS.attr(),
  candidatureStatus: DS.attr('string', { defaultValue: 'non-responded-offre' }),

  nonRespondedOffre: computed('candidatureStatus', function () {
    return this.get('candidatureStatus') === 'non-responded-offre'
  })
})
