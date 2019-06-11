import Controller from '@ember/controller'
import ENV from '../config/environment'

export default Controller.extend({
  swipeMode: ENV.APP.TU_FF_SWIPE_MODE
})
