import Service, { inject as service } from '@ember/service'

export default Service.extend({
  http: service('ajax'),

  async denyOffre (offreId, userId) {
    return this.http.put(`/candidats/${userId}/candidatures/rel/${offreId}`, {
      data: { status: 'denied' }
    })
  },

  async applyToOffre (offreId, userId) {
    return this.http.put(`/candidats/${userId}/candidatures/rel/${offreId}`)
  },

  async retrieveUserId (email) {
    const filter = JSON.stringify({ where: { email: { ilike: email } } })
    const user = await this.http.request(`/candidats?filter=${escape(filter)}`)
    if (user && user.length > 0) {
      return user[0].id
    } else {
      throw new Error('Cannot find user with this email')
    }
  },

  async userExists (userId) {
    try {
      const user = await this.http.request(`/candidats/${userId}`)
      return !!user
    } catch (error) {
      return false
    }
  }
})
