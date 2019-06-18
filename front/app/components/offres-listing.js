import uuidv4 from 'uuid/v4'
import ENV from '../config/environment'
import Component from '@ember/component'
import { storageFor } from 'ember-local-storage'
import { inject as service } from '@ember/service'

export default Component.extend({
  api: service(),
  user: storageFor('user'),
  isApplying: true,

  actions: {
    async postuler (offre) {
      const userId = this.get('user').get('id')
      if (!userId) {
        this.get('user').set('id', uuidv4())
        openTypeform(offre.id, this.get('user').get('id'))
      } else {
        try {
          await this.get('api').applyToOffre(offre.id, userId)
        } catch (error) {
          openTypeform(offre.id, userId)
        }
        offre.set('candidatureStatus', 'applied-offre')
      }
    }
  }
})

function openTypeform (offreId, userId) {
  window.open(`${ENV.APP.typeformUrl}?id_offre=${offreId}&id_user=${userId}`, '_blank')
}
