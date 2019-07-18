import uuidv4 from 'uuid/v4'
import ENV from '../config/environment'
import Component from '@ember/component'
import { storageFor } from 'ember-local-storage'
import { inject as service } from '@ember/service'
import typeformEmbed from '@typeform/embed'

export default Component.extend({
  api: service(),
  metrics: service(),
  user: storageFor('user'),
  isApplying: true,
  isShowingModal: false,
  isShowingError: false,
  selectedOffre: null,

  actions: {
    async postuler (offre) {
      this._trackEvent({ action: 'Interet_Offre', label: 'Ca m\'interesse' })
      const userId = this._getUserId()
      this.set('selectedOffre', offre)

      if (!userId) {
        this.get('user').set('id', uuidv4())
        this._showConnectionDialog()
      } else {
        try {
          await this._applyToOffre(offre, userId)
        } catch (error) {
          this._showConnectionDialog()
        }
      }
    },

    async retrieveAccount (email) {
      this._hideConnectionDialog()
      const userId = await this.get('api')
        .retrieveUserId(email)
        .catch(() => this.set('isShowingError', true))
      this.get('user').set('id', userId)
      const newOffres = this.get('offres').store.findAll('offre')
      this.transitionToRoute('offres', newOffres)
      const selectedOffre = this.get('selectedOffre')
      if (selectedOffre.nonRespondedOffre) {
        await this._applyToOffre(this.get('selectedOffre'), userId)
      }
    },

    async openForm () {
      const offre = this.get('selectedOffre')
      this._openTypeform(offre)
      this._hideConnectionDialog()
    }
  },

  _trackEvent: function ({ action, label }) {
    this.metrics.trackEvent({
      category: 'DemandeurDEmploi',
      action,
      label
    })
  },

  _openTypeform: function (offre) {
    const userId = this._getUserId()
    this._trackEvent({ action: 'Interet_Offre', label: 'Ca m\'interesse' })
    typeformEmbed.makePopup(`${ENV.APP.typeformUrl}?id_offre=${offre.id}&id_user=${userId}`, {
      mode: 'popup',
      autoOpen: true,
      autoClose: 2,
      hideScrollbars: true,
      onSubmit: function () {
        offre.set('candidatureStatus', 'applied-offre')
        this._trackEvent({ action: 'Inscription_DE', label: 'Inscription DE' })
      }
    })
  },

  _getUserId: function () {
    return this.get('user').get('id')
  },

  _showConnectionDialog: function () {
    this.set('isShowingModal', true)
  },

  _hideConnectionDialog: function () {
    this.set('isShowingModal', false)
  },

  _applyToOffre: async function (offre, userId) {
    await this.get('api').applyToOffre(offre.id, userId)
    offre.set('candidatureStatus', 'applied-offre')
    this._trackEvent({ action: 'Envoi_CV', label: 'Candidature' })
  }
})
