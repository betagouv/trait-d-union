import Controller from '@ember/controller'
import ENV from '../config/environment'
import { computed } from '@ember/object'
import { storageFor } from 'ember-local-storage'

export default Controller.extend({
  swipeMode: ENV.APP.TU_FF_SWIPE_MODE,
  user: storageFor('user'),
  isConnected: computed('user.id', function () {
    return !!this.get('user').get('id')
  })
})
