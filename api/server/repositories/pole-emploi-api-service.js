const LRU = require('lru-cache')
const request = require('request-promise-native')
const Boom = require('boom')

const maxAge = 60 * 60 * 1000 // 1 hour
const _cache = new LRU({ maxAge })

const PE_API_KEY_CACHE_NAME = 'PE_API_KEY'

module.exports = ({ apiConfiguration, cache = _cache }) => {
  const getApiKey = createGetApiKey({ apiConfiguration, cache })
  const getEndpointResponse = createGetEndpointResponse({ apiConfiguration, cache })
  return {
    request: async (urlSuffix, query, method = 'GET') => {
      const apiKey = await getApiKey()
      return getEndpointResponse(urlSuffix, apiKey, query, method).catch(async error => {
        if (error.statusCode !== 403) {
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
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      json: true,
      time: true,
      resolveWithFullResponse: true,
      method
    }
    if (query) {
      Object.assign(options, { qs: query })
    }
    const response = await request(options)

    return response.body
  }

const createGetApiKey = ({ apiConfiguration, cache }) => async () => {
  let apiKey = cache.get(PE_API_KEY_CACHE_NAME)
  if (!apiKey) {
    const response = await request
      .post({
        uri: apiConfiguration.authentBaseUrl,
        qs: {
          realm: '/partenaire',
          grant_type: 'client_credentials',
          client_id: apiConfiguration.clientId,
          client_secret: apiConfiguration.clientSecret,
          scope: `api_offresdemploiv2 application_${apiConfiguration.clientId} o2dsoffre`
        },
        json: true,
        time: true,
        resolveWithFullResponse: true
      })
      .catch(_throwApiError)
    apiKey = response.body.access_token
    cache.set(PE_API_KEY_CACHE_NAME, apiKey)
  }
  return apiKey
}

function _throwApiError (error) {
  const statusCode = error.statusCode !== 500 ? error.statusCode : 503
  Boom.boomify(error, { statusCode })
  throw error
}
