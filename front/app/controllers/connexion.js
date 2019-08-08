import uuidv4 from 'uuid/v4'
import ENV from '../config/environment'
import Controller from '@ember/controller'
import typeformEmbed from '@typeform/embed'
import { storageFor } from 'ember-local-storage'
import { inject as service } from '@ember/service'

export default Controller.extend({
  isShowingError: false,
  retrieveAccountButtonDisabled: true,
  enteredEmail: null,
  user: storageFor('user'),
  metrics: service(),
  api: service(),

  actions: {
    async retrieveAccount () {
      try {
        const userId = await this.get('api').retrieveUserId(this.get('enteredEmail'))
        this.get('user').set('id', userId)
        this.transitionToRoute('offres')
      } catch (error) {
        this.set('isShowingError', true)
      }
    },

    emailChanged (enteredEmail) {
      if (enteredEmail.includes('@')) {
        this.set('enteredEmail', enteredEmail)
        this.set('retrieveAccountButtonDisabled', false)
      } else {
        this.set('retrieveAccountButtonDisabled', true)
      }
    },

    openForm () {
      const userId = uuidv4()
      this._trackEvent({ action: 'Interet_Offre', label: 'Ouverture formulaire' })
      this._onSubmit.bind(this)
      typeformEmbed.makePopup(`${ENV.APP.typeformUrl}?id_user=${userId}`, {
        mode: 'popup',
        autoOpen: true,
        autoClose: 2,
        hideScrollbars: true,
        onSubmit: this._onSubmit(userId)
      })
    }
  },

  _trackEvent: function ({ action, label }) {
    this.metrics.trackEvent({
      category: 'DemandeurDEmploi',
      action,
      label
    })
  },

  _onSubmit: function (userId) {
    this.get('user').set('id', userId)
    return () => {
      this._trackEvent({ action: 'Inscription_DE', label: 'Inscription DE' })
    }
  }
})
