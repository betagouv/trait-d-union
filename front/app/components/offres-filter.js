import Component from '@ember/component'

export default Component.extend({
  classNames: ['list-filter', 'py-4'],
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
        return offre.sessions.some(session => {
          return session.action.niveauQualificationEntree === niveau
        })
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
