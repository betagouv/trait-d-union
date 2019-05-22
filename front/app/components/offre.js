import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
  dureeTravail: computed(function () {
    return `🕐 ${this.offre.dureeTravailLibelle ? this.offre.dureeTravailLibelle : 'Non renseigné'}`
  }),

  typeContrat: computed(function () {
    return `contrat: ${this.offre.typeContrat}`
  }),

  titre: computed(function () {
    return this.offre.appellationlibelle
  }),

  description: computed(function () {
    return this.offre.description
  }),

  salaire: computed(function () {
    const salaire =
      this.offre.salaire.libelle ||
      this.offre.salaire.commentaire ||
      this.offre.salaire.complement1

    return `salaire: ${salaire}`
  }),

  sessionDuration: computed(function () {
    return `📆 ${this.offre.sessions[0].duration} mois de formation`
  }),

  lieuTravail: computed(function () {
    const nom = this.offre.contact && this.offre.contact.nom
    return nom
      ? `📍${nom} à ${this.offre.lieuTravail.libelle}`
      : `📍${this.offre.lieuTravail.libelle}`
  })

})
