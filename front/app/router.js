import EmberRouter from '@ember/routing/router'
import config from './config/environment'
import { scheduleOnce } from '@ember/runloop'
import { inject as service } from '@ember/service'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),

  init () {
    this._super(...arguments)
    this.on('routeDidChange', () => {
      this._trackPage()
    })
  },

  _trackPage () {
    scheduleOnce('afterRender', this, () => {
      const page = this.url
      const title = this.getWithDefault('currentRouteName', 'unknown')
      this.metrics.trackPage({ page, title })
    })
  }
})

Router.map(function () {
  this.route('faq')
  this.route('steps')
  this.route('offres')
  this.route('loading')
  this.route('connexion')
})

export default Router
