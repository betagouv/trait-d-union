import Service, { inject as service } from '@ember/service'

export default Service.extend({
  api: service(),
  async deny ({ offre }) {
    console.log(`User denied offre ${offre.id} - ${offre.appellationlibelle}`)
    return this.api.deny({ offreId: offre.id })
  },

  async applyTo ({ offre }) {
    console.log(`User applied to offre ${offre.id} - ${offre.appellationlibelle}`)
    return this.api.applyTo({ offreId: offre.id })
  }
})
