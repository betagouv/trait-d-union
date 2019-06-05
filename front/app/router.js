import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('offres-listing')
  this.route('faq')
  this.route('steps')
  this.route('offres')
})

export default Router
