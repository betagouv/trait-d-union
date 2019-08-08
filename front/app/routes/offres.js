import Route from '@ember/routing/route'
import ENV from '../config/environment'
import { storageFor } from 'ember-local-storage'

export default Route.extend({
  swipeMode: ENV.APP.TU_FF_SWIPE_MODE,
  user: storageFor('user'),

  beforeModel () {
    const isConnected = !!this.get('user').get('id')
    if (!isConnected && this.swipeMode) {
      this.transitionTo('connexion')
    }
  },

  model () {
    return this.store.findAll('offre')
  },

  actions: {
    loading (transition, originRoute) {
      const controller = this.controllerFor('offres')
      controller.set('currentlyLoading', true)

      return true
    }
  }
})
