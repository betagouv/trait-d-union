import Component from '@ember/component'
import { computed } from '@ember/object'
import { htmlSafe } from '@ember/string'
import { run } from '@ember/runloop'
import anime from 'animejs'

export default Component.extend({
  attributeBindings: ['style'],
  isInitialRender: true,
  visibleItemAmount: 0,
  index: 0,
  style: null,
  lastIndex: -1,
  createFadeAnimation: null,
  createShiftAnimation: null,

  init (...args) {
    this.shiftCard = this.shiftCard.bind(this)
    const factor = this.get('factor')
    const style = this.getInitialCardStyle(factor)
    this.set('style', htmlSafe(style))
    this._super(...args)
  },
  didReceiveAttrs () {
    const index = this.get('index')
    const lastIndex = this.get('lastIndex')
    const isInitialRender = this.get('isInitialRender')
    if (!isInitialRender && (lastIndex === -1 || lastIndex !== index)) {
      run.scheduleOnce('afterRender', this.shiftCard)
    }
    this.set('lastIndex', index)
  },
  willDestroyElement (...args) {
    if (this.get('isLast')) {
      const element = this.element.cloneNode(true)
      element.setAttribute('id', null)
      this.element.parentNode.append(element)
      const opts = this.createFadeAnimation(this.get('fadeToRight'))
      opts.targets = element
      anime(opts).finished.then(() => {
        run(() => {
          element.remove()
        })
      })
    }
    this._super(...args)
  },

  dureeTravail: computed(function () {
    return `🕐 ${this.offre.dureeTravailLibelle ? this.offre.dureeTravailLibelle : 'Non renseigné'}`
  }),

  typeContrat: computed(function () {
    return `Contrat ${this.offre.typeContrat}`
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

    return `Rémunération : ${salaire}`
  }),

  sessionDuration: computed(function () {
    return `📆 ${this.offre.sessions[0].duration} mois de formation`
  }),

  lieuTravail: computed(function () {
    const nom = this.offre.contact && this.offre.contact.nom
    return nom
      ? `📍${nom} à ${this.offre.lieuTravail.libelle}`
      : `📍${this.offre.lieuTravail.libelle}`
  }),

  niveauQualification: computed(function () {
    const niveaux = {
      'sans-diplome': 'Sans diplôme',
      'cap-bep': 'BEP-CAP',
      'bac-bac+1': 'BAC ou BAC+1',
      'bac+2': 'BAC+2',
      'bac+3-bac+4': 'BAC+3 ou BAC+4'
    }
    const niveauQualificationEntree = this.offre.sessions[0].action.niveauQualificationEntree
    return niveaux[niveauQualificationEntree]
  }),

  factor: computed('index', 'visibleItemAmount', function () {
    const index = this.get('index')
    const visibleItemAmount = this.get('visibleItemAmount')
    return visibleItemAmount - index
  }),

  shiftCard () {
    const opts = this.createShiftAnimation(this.get('factor') - 1)
    opts.targets = this.element
    this.set('currentAnimation', anime(opts))
  }
})
