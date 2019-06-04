import DS from 'ember-data'
import { computed } from '@ember/object'
import ENV from '../config/environment'

export default DS.RESTAdapter.extend({
  host: ENV.APP.apiUrl,
  namespace: 'api/v0',
  headers: computed(function () {
    return {
      'accept': 'application/json'
    }
  })
})
