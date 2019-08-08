import Route from '@ember/routing/route'
import { storageFor } from 'ember-local-storage'

export default Route.extend({
  user: storageFor('user'),

  beforeModel () {
    const isConnected = !!this.get('user').get('id')
    if (isConnected) {
      this.transitionTo('offres')
    }
  }
})
