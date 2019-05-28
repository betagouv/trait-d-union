import Component from '@ember/component'

export default Component.extend({
  classNames: ['list-filter-niveau', 'active'],
  value: '',

  init () {
    this._super(...arguments)
    this.set('results', this.offres)
    this.set('currentFilter', '')
  },

  actions: {
    filterByNiveau: function (niveau) {
      this.set('currentFilter', niveau)
      const offres = this.get('offres')
      console.log(`${this.offres.length} offres to filter`)
      console.log(`Will filter with ${niveau}`)
      if (!niveau) {
        this.set('results', offres)
        return
      }
      const results = offres.filter(offre => {
        return offre.sessions[0].action.niveauQualificationEntree === niveau
      })
      this.set('results', results)
      console.log(results.length)
    }
  }
})
