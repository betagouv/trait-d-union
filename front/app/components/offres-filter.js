import Component from '@ember/component'

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init () {
    this._super(...arguments)
    this.set('results', this.offres)
    this.set('currentFilter', '')
  },

  actions: {
    filterByKeyword () {
      const offres = this.get('offres')
      const filteredOffres = filterByValue(offres, this.keyword)
      this.set('results', filteredOffres)
    },

    filterByNiveau: function (niveau) {
      this.set('currentFilter', niveau)
      const offres = this.get('offres')
      if (!niveau) {
        this.set('results', offres)
        return
      }
      const results = offres.filter(offre => {
        return offre.sessions[0].action.niveauQualificationEntree === niveau
      })
      this.set('results', results)
    }
  }
})

function filterByValue (array, string) {
  return array
    .filter(offre => {
      const description = offre.get('description')
      return description.toLowerCase().includes(string.toLowerCase())
    })
}
