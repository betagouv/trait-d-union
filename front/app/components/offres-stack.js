import Component from '@ember/component'
import { A as EArray } from '@ember/array'
import { computed } from '@ember/object'
import { run } from '@ember/runloop'
import { inject as service } from '@ember/service'
import { storageFor } from 'ember-local-storage'
import uuidv4 from 'uuid/v4'

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
  user: storageFor('user'),
  api: service(),
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
  // state
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

  // lifecycle
  didInsertElement () {
    run.next(() => {
      this.set('isInitialRender', false)
    })
  },

  removeLastCard ({ fadeToRight }) {
    this.set('fadeToRight', fadeToRight)
    run.next(() => {
      this.incrementProperty('currentItemIndex')
      this.items.shiftObject()
    })
  },

  actions: {
    notInterested () {
      const offre = this.currentItem
      this.api.denyOffre(offre.id, this._getUserId()).then(() => {
        this.removeLastCard({ fadeToRight: false })
      }).catch(error => console.log(`Error occured while denying offer: ${error}`))
    },

    interested () {
      const offre = this.currentItem
      this.api.applyToOffre(offre.id, this._getUserId()).then(() => {
        this.removeLastCard({ fadeToRight: true })
      }).catch(error => console.log(`Error occured while accepting offer: ${error}`))
    }
  },

  _getUserId: function () {
    const userId = this.get('user').get('id')
    if (!userId) {
      this.get('user').set('id', uuidv4())
    }
    return this.get('user').get('id')
  }
})
