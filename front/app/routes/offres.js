import Route from '@ember/routing/route'

export default Route.extend({
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
