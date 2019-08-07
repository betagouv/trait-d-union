import Component from '@ember/component'
import { A as EArray } from '@ember/array'
import { computed } from '@ember/object'
import { run } from '@ember/runloop'
import { inject as service } from '@ember/service'
import ENV from '../config/environment'
import { storageFor } from 'ember-local-storage'
import uuidv4 from 'uuid/v4'
import typeformEmbed from '@typeform/embed'

const createCardFadeAnimation = (toRight) => ({
  translateX: {
    value: `${toRight ? '' : '-'}100vw`,
    duration: 250
  },
  translateY: {
    value: '-30vw',
    duration: 250
  },
  rotate: {
    value: `${toRight ? '' : '-'}60deg`,
    duration: 350
  },
  opacity: {
    value: 0.3,
    duration: 200
  },
  easing: 'easeInQuad'
})
const createCardShiftAnimation = factor => ({
  translateY: (factor - 3) * -1.5 + 'vh',
  scale: 1 - factor * 0.03,
  duration: 300,
  easing: 'easeOutSine'
})
const getInitialCardStyle = factor => `transform: translateY(${(factor - 4) * -1.5}vh) scale(${1 - factor * 0.03});`

export default Component.extend({
  isApplying: true,
  isShowingModal: false,
  isShowingError: false,
  user: storageFor('user'),
  api: service(),
  metrics: service(),
  classNames: ['offres-stack'],
  tagName: 'div',
  items: null,
  offres: null,
  visibleItemAmount: 5,
  currentItemIndex: 0,
  fadeToRight: true,
  createCardFadeAnimation,
  createCardShiftAnimation,
  getInitialCardStyle,
  isInitialRender: true,
  currentItem: computed('currentItemIndex', 'items.[]', function () {
    const currentItemIndex = this.get('currentItemIndex')
    const items = this.get('items')
    return items.objectAt(currentItemIndex)
  }),

  visibleItems: computed('currentItemIndex', 'visibleItemAmount', 'items.[]', function () {
    const items = this.get('items').filter(offre => offre.nonRespondedOffre)
    const currentItemIndex = this.get('currentItemIndex')
    const visibleItemAmount = this.get('visibleItemAmount')
    const activeItems = EArray(items.slice(currentItemIndex, currentItemIndex + visibleItemAmount))
    activeItems.reverse()
    return activeItems
  }),

  didReceiveAttrs () {
    this.set('items', this.offres.toArray())
  },

  didInsertElement () {
    run.next(() => {
      this.set('isInitialRender', false)
    })
  },

  removeLastCard ({ fadeToRight }) {
    this.set('fadeToRight', fadeToRight)
    run.next(() => {
      this.items.shiftObject()
    })
  },

  actions: {
    async openForm () {
      const offre = this.get('currentItem')
      this._openTypeform(offre)
      this._hideConnectionDialog()
    },

    async retrieveAccount (email) {
      this._hideConnectionDialog()
      const userId = await this.get('api')
        .retrieveUserId(email)
        .catch(() => this.set('isShowingError', true))
      this.get('user').set('id', userId)
      const newOffres = this.get('offres').store.findAll('offre')
      this.get('router').transitionTo('offres', newOffres)
    },

    async notInterested () {
      const offre = this.currentItem
      this.removeLastCard({ fadeToRight: false })
      return this.api.denyOffre(offre.id, this._getUserId())
    },

    async interested () {
      const offre = this.currentItem
      console.log(`Offre: ${offre.id}`)
      this.removeLastCard({ fadeToRight: true })
      return this.api.applyToOffre(offre.id, this._getUserId())
    }
  },

  _getUserId: function () {
    const userId = this.get('user').get('id')
    if (!userId) {
      this.get('user').set('id', uuidv4())
    }
    return this.get('user').get('id')
  },

  _trackEvent: function ({ action, label }) {
    this.metrics.trackEvent({
      category: 'DemandeurDEmploi',
      action,
      label
    })
  },

  _openTypeform: function (offre) {
    const userId = this._getUserId()
    this._trackEvent({ action: 'Interet_Offre', label: 'Ca m\'interesse' })
    this._onSubmit.bind(this)
    typeformEmbed.makePopup(`${ENV.APP.typeformUrl}?id_offre=${offre.id}&id_user=${userId}`, {
      mode: 'popup',
      autoOpen: true,
      autoClose: 2,
      hideScrollbars: true,
      onSubmit: this._onSubmit
    })
  },

  _onSubmit: function (offre) {
    return () => {
      offre.set('candidatureStatus', 'applied-offre')
      this._trackEvent({ action: 'Inscription_DE', label: 'Inscription DE' })
    }
  },

  _showConnectionDialog: function () {
    this.set('isShowingModal', true)
  },

  _hideConnectionDialog: function () {
    this.set('isShowingModal', false)
  }
})
