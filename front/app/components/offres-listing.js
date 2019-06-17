import Component from '@ember/component'
import fade from 'ember-animated/transitions/fade'
import ENV from '../config/environment'
import uuidv4 from 'uuid/v4'

export default Component.extend({
  transition: fade,

  actions: {
    postuler (offre) {
      window.open(`${ENV.APP.typeformUrl}?id_offre=${offre.id}&id_user=${uuidv4()}`, '_blank')
    }
  }
})
