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

  actions: {
    async postuler (offre) {
      this._trackEvent({ action: 'Interet_Offre', label: 'Ca m\'interesse' })
      const userId = this.get('user').get('id')
      if (!userId) {
        this.get('user').set('id', uuidv4())
        this._openTypeform(offre, this.get('user').get('id'))
      } else {
        try {
          await this.get('api').applyToOffre(offre.id, userId)
          offre.set('candidatureStatus', 'applied-offre')
          this._trackEvent({ action: 'Envoi_CV', label: 'Candidature' })
        } catch (error) {
          this._openTypeform(offre, userId)
        }
      }
    }
  },

  _trackEvent: function ({ action, label }) {
    this.metrics.trackEvent({
      category: 'DemandeurDEmploi',
      action,
      label
    })
  },

  _openTypeform: function (offre, userId) {
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
  }
})
