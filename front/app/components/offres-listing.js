import Component from '@ember/component'
import fade from 'ember-animated/transitions/fade'

export default Component.extend({
  transition: fade,

  actions: {
    postuler (offre) {
      window.open(`https://traitdunion.typeform.com/to/FsNL2J?id_offre=${offre.id}`, '_blank')
    }
  }
})
