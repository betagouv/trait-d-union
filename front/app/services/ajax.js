import AjaxService from 'ember-ajax/services/ajax'
import ENV from '../config/environment'

export default AjaxService.extend({
  host: ENV.APP.apiUrl,
  namespace: '/api/v0'
})
