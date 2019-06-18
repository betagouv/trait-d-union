import DS from 'ember-data'
import { computed } from '@ember/object'
import ENV from '../config/environment'
import { storageFor } from 'ember-local-storage'

export default DS.RESTAdapter.extend({
  user: storageFor('user'),
  host: ENV.APP.apiUrl,
  namespace: 'api/v0',
  headers: computed('user.id', function () {
    let headers = { 'accept': 'application/json' }
    const userId = this.get('user.id')
    if (userId) {
      headers['user-id'] = userId
    }
    return headers
  })
})
