import uuidv4 from 'uuid/v4'
import ENV from '../config/environment'
import Component from '@ember/component'
import { storageFor } from 'ember-local-storage'
import { inject as service } from '@ember/service'
import typeformEmbed from '@typeform/embed'

export default Component.extend({
  api: service(),
  user: storageFor('user'),
  isApplying: true,

  actions: {
    async postuler (offre) {
      const userId = this.get('user').get('id')
      if (!userId) {
        this.get('user').set('id', uuidv4())
        openTypeform(offre, this.get('user').get('id'))
      } else {
        try {
          await this.get('api').applyToOffre(offre.id, userId)
          offre.set('candidatureStatus', 'applied-offre')
        } catch (error) {
          openTypeform(offre, userId)
        }
      }
    }
  }
})

function openTypeform (offre, userId) {
  typeformEmbed.makePopup(`${ENV.APP.typeformUrl}?id_offre=${offre.id}&id_user=${userId}`, {
    mode: 'popup',
    autoOpen: true,
    autoClose: 2,
    hideScrollbars: true,
    onSubmit: function () {
      offre.set('candidatureStatus', 'applied-offre')
    }
  })
}
