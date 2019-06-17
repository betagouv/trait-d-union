import Service, { inject as service } from '@ember/service'

export default Service.extend({
  http: service('ajax'),
  userId: 'randomly-generated-user-id',

  async applyTo ({ offreId }) {
    return this.http.post(`/offres/${offreId}`, { action: 'apply', userId: this.userId })
  },

  async deny ({ offreId }) {
    return this.http.post(`/offres/${offreId}`, { action: 'deny', userId: this.userId })
  },

  async applyToOffre (offreId, userId) {
    return this.http.put(`/candidats/${userId}/candidatures/rel/${offreId}`)
  }
})
