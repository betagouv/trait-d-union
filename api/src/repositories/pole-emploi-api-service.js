const request = require('request-promise-native')
const Boom = require('boom')
const logger = require('../utils/logger')

const PE_API_KEY_CACHE_NAME = 'PE_API_KEY'

module.exports = ({ apiConfiguration, cache }) => {
  const getApiKey = createGetApiKey({
    apiConfiguration,
    cache
  })
  const getEndpointResponse = createGetEndpointResponse({
    apiConfiguration,
    cache
  })
  return {
    request: async (urlSuffix, query, method = 'GET') => {
      const apiKey = await getApiKey()
      return getEndpointResponse(urlSuffix, apiKey, query, method).catch(async error => {
        if (error.statusCode !== 403 && error.statusCode !== 401) {
          _throwApiError(error)
        }
        cache.del(PE_API_KEY_CACHE_NAME)
        const apiKey = await getApiKey()
        return getEndpointResponse(urlSuffix, apiKey, query, method)
      })
    }
  }
}

const createGetEndpointResponse = ({ apiConfiguration }) =>
  async (urlSuffix, apiKey, query, method) => {
    const options = {
      uri: `${apiConfiguration.apiBaseUrl}${urlSuffix}`,
      headers: { Authorization: `Bearer ${apiKey}` },
      json: true,
      time: true,
      resolveWithFullResponse: true,
      method
    }
    logger().debug(`Pole Emploi API: Will request endpoint ${urlSuffix}`)
    if (query) {
      Object.assign(options, { qs: query })
      logger().debug(`using query parameters: ${JSON.stringify(query)}`)
    }
    const response = await request(options)

    logger().debug(`Pole Emploi API: Did get response from endpoint ${urlSuffix}`)
    return response.body
  }

const createGetApiKey = ({ apiConfiguration, cache }) => async () => {
  let apiKey = cache.get(PE_API_KEY_CACHE_NAME)
  if (!apiKey) {
    logger().debug('Pole Emploi API: Will get token')
    const response = await request
      .post({
        uri: apiConfiguration.authentBaseUrl,
        qs: {
          realm: '/partenaire',
          grant_type: 'client_credentials',
          client_id: apiConfiguration.clientId,
          client_secret: apiConfiguration.clientSecret,
          scope: `api_labonneboitev1 api_offresdemploiv2 application_${apiConfiguration.clientId} o2dsoffre`
        },
        json: true,
        time: true,
        resolveWithFullResponse: true
      })
      .catch(_throwApiError)
    apiKey = response.body.access_token
    logger().debug('Pole Emploi API: Did get token and stored in cache')
    cache.set(PE_API_KEY_CACHE_NAME, apiKey)
  } else {
    logger().debug('Pole Emploi API: token retrieved from cache')
  }
  return apiKey
}

function _throwApiError (apiError) {
  logger().error(`Error received from Pole Emploi API: ${apiError}`)
  const statusCode = apiError.statusCode !== 500 ? apiError.statusCode : 503
  Boom.boomify(apiError, { statusCode })
  throw apiError
}
