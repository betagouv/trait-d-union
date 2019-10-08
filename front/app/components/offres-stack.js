import uuidv4 from 'uuid/v4'
import ENV from '../config/environment'
import Component from '@ember/component'
import { A as EArray } from '@ember/array'
import { computed } from '@ember/object'
import { run } from '@ember/runloop'
import { inject as service } from '@ember/service'
import { storageFor } from 'ember-local-storage'
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
  isShowingError: false,
  user: storageFor('user'),
  api: service(),
  router: service(),
  metrics: service(),
  classNames: ['offres-stack', 'pb-5'],
  tagName: 'div',
  items: null,
  offres: null,
  visibleItemAmount: 5,
  currentItemIndex: 0,
  fadeToRight: true,
  createCardFadeAnimation,
  createCardShiftAnimation,
  getInitialCardStyle,
  afterConnectionOperation: null,
  isInitialRender: true,
  currentItem: computed('currentItemIndex', 'items.[]', function () {
    const currentItemIndex = this.get('currentItemIndex')
    const items = this.get('items').filter(offre => offre.nonRespondedOffre)
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
      this.incrementProperty('currentItemIndex')
    })
  },

  async ensureUserIsConnected (operation) {
    const userId = this._getUserId()
    if (!userId) {
      this.get('user').set('id', uuidv4())
      this.afterConnectionOperation = operation
      this._showConnectionDialog()
    } else {
      try {
        const userExists = await this.api.userExists(userId)
        if (!userExists) {
          this._showConnectionDialog()
        } else {
          await operation()
        }
      } catch (error) {
        this._showConnectionDialog()
      }
    }
  },

  _showConnectionDialog: function () {
    this.set('isShowingModal', true)
  },

  _hideConnectionDialog: function () {
    this.set('isShowingModal', false)
  },

  _openTypeform: function () {
    const userId = this._getUserId()
    this._trackEvent({ action: 'Interet_Offre', label: 'Ca m\'interesse' })
    typeformEmbed.makePopup(`${ENV.APP.typeformUrl}?id_user=${userId}`, {
      mode: 'popup',
      autoOpen: true,
      autoClose: 2,
      hideScrollbars: true,
      onSubmit: function () {
      }
    })
  },

  actions: {
    async openForm () {
      const offre = this.get('selectedOffre')
      this._openTypeform(offre)
      this._hideConnectionDialog()
    },

    async retrieveAccount (email) {
      this._hideConnectionDialog()
      const userId = await this.get('api')
        .retrieveUserId(email)
        .catch(() => this.set('isShowingError', true))
      this.get('user').set('id', userId)
      const newOffres = await this.get('offres').store.findAll('offre')

      if (this.afterConnectionOperation) {
        await this.afterConnectionOperation()
      }
      this.get('router').transitionTo('offres', newOffres)
    },

    async notInterested () {
      const offre = this.currentItem
      return this.ensureUserIsConnected(() => {
        this.removeLastCard({ fadeToRight: false })
        this._trackEvent({ action: 'Refus', label: 'Offre refusée' })
        return this.api.denyOffre(offre.id, this._getUserId())
      })
    },

    async interested () {
      const offre = this.currentItem
      return this.ensureUserIsConnected(() => {
        this.removeLastCard({ fadeToRight: true })
        this._trackEvent({ action: 'Envoi_CV', label: 'Candidature' })
        return this.api.applyToOffre(offre.id, this._getUserId())
      })
    }
  },

  _getUserId: function () {
    return this.get('user').get('id')
  },

  _trackEvent: function ({ action, label }) {
    this.metrics.trackEvent({
      category: 'DemandeurDEmploi',
      action,
      label
    })
  }
})
