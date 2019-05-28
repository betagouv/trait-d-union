import Component from '@ember/component'

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init () {
    this._super(...arguments)
    this.set('results', this.offres)
  },

  actions: {
    filterByKeyword () {
      const offres = this.get('offres')
      console.log(`${offres.length} offres to filter`)
      console.log(`Will filter with ${this.keyword}`)
      const filteredOffres = filterByValue(offres, this.keyword)
      console.log(filteredOffres.length)
      this.set('results', filteredOffres)
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
