import DS from 'ember-data'
import { computed } from '@ember/object'

export default DS.RESTAdapter.extend({
  host: 'https://api.traitdunion.beta.gouv.fr',
  // host: 'http://localhost:3000',
  namespace: 'api/v0',
  headers: computed(function () {
    return {
      'accept': 'application/json'
    }
  })
})
