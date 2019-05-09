const nock = require('nock')
const { sinon, expect } = require('../../tests/test-utils')
const createPoleEmploiApiService = require('./pole-emploi-api-service')

describe('Pole Emploi API Service', () => {
  let poleEmploiApi, poleEmploiAuthentApi
  const apiConfiguration = {
    apiBaseUrl: 'https://test.pole-emploi.fr/api',
    authentBaseUrl: 'https://test.pole-emploi.fr/api/access_token',
    clientId: 'clientId',
    clientSecret: 'clientSecret'
  }
  const cacheMemory = {}
  const cache = {
    del: (key) => delete cacheMemory[key],
    set: sinon.spy((key, value) => {
      cacheMemory[key] = value
    }),
    get: sinon.spy((key) => cacheMemory[key])
  }
  const poleEmploiApiService = createPoleEmploiApiService({ apiConfiguration, cache })

  beforeEach(() => {
    poleEmploiApi = nock(apiConfiguration.apiBaseUrl)
    poleEmploiAuthentApi = nock(apiConfiguration.authentBaseUrl)
  })
  afterEach(() => {
    nock.cleanAll()
  })
  describe('.getOffres({codeROME})', () => {
    describe('when API key is not in cache', () => {
      beforeEach(() => {
        delete cacheMemory['PE_API_KEY']
      })
      describe('when Authenticate on PE API fails', () => {
        it('throws corresponding Boom error', () => {
          poleEmploiAuthentApi
            .post('')
            .query({
              realm: '/partenaire',
              grant_type: 'client_credentials',
              client_id: apiConfiguration.clientId,
              client_secret: apiConfiguration.clientSecret,
              scope: 'api_labonneboitev1 api_offresdemploiv2 application_clientId o2dsoffre'
            })
            .reply(400)

          return poleEmploiApiService.request('/fakeUrl').should.be.rejected().then(error => {
            expect(error).to.have.property('isBoom')
            expect(error.output.statusCode).to.equal(400)
            poleEmploiAuthentApi.done()
          })
        })
      })
      describe('when Authenticate on PE API succeeds', () => {
        beforeEach(() => {
          poleEmploiApi
            .get('/fakeUrl')
            .matchHeader('Authorization', 'Bearer fake_apikey')
            .reply(200, { data: 'value' })
          poleEmploiAuthentApi
            .post('')
            .query({
              realm: '/partenaire',
              grant_type: 'client_credentials',
              client_id: apiConfiguration.clientId,
              client_secret: apiConfiguration.clientSecret,
              scope: 'api_labonneboitev1 api_offresdemploiv2 application_clientId o2dsoffre'
            })
            .reply(200, {
              scope: 'api_labonneboitev1 api_offresdemploiv2 o2dsoffre',
              expires_in: 1500,
              token_type: 'Bearer',
              access_token: 'fake_apikey'
            })
        })

        afterEach(() => {
          // cache.set.restore()
        })

        it('requests the PE API to get an authentication token', async () => {
          await poleEmploiApiService.request('/fakeUrl')

          poleEmploiAuthentApi.done()
        })

        it('forwards the request to the upstream API and returns the result', async () => {
          const actual = await poleEmploiApiService.request('/fakeUrl')

          expect(actual).to.eql({ data: 'value' })
          poleEmploiApi.done()
          poleEmploiAuthentApi.done()
        })

        it('stores API key in cache', async () => {
          await poleEmploiApiService.request('/fakeUrl')
          expect(cache.set).to.have.been.calledWith(
            'PE_API_KEY',
            'fake_apikey'
          )
        })
      })
      describe('when Pole Emploi API key is in cache', () => {
        beforeEach(() => {
          cacheMemory['PE_API_KEY'] = 'fake_apikey'
        })

        describe('and is valid', () => {
          it('forwards the request to the upstream API', async () => {
            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_apikey')
              .reply(200, { data: 'value' })

            await poleEmploiApiService.request('/fakeUrl')

            poleEmploiApi.done()
          })
        })

        it('forwards the request based on any HTTP methods', async () => {
          const query = { param: 'value' }
          poleEmploiApi
            .put('/fakeUrl')
            .query(query)
            .matchHeader('Authorization', 'Bearer fake_apikey')
            .reply(200)
          await poleEmploiApiService.request('/fakeUrl', query, 'PUT')
          poleEmploiApi.done()
        })

        describe('and is not valid any more because of Forbidden token', () => {
          beforeEach(() => {
            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_apikey')
              .reply(403)
            poleEmploiAuthentApi
              .post('')
              .query({
                realm: '/partenaire',
                grant_type: 'client_credentials',
                client_id: apiConfiguration.clientId,
                client_secret: apiConfiguration.clientSecret,
                scope: 'api_labonneboitev1 api_offresdemploiv2 application_clientId o2dsoffre'
              })
              .reply(200, {
                scope: 'api_labonneboitev1 api_offresdemploiv2 o2dsoffre',
                expires_in: 1500,
                token_type: 'Bearer',
                access_token: 'fake_new_apikey'
              })

            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_new_apikey')
              .reply(200)
          })

          it('gets a new API key and eventually forwards the request', async () => {
            // WHEN
            await poleEmploiApiService.request('/fakeUrl')
            // THEN
            poleEmploiApi.done()
            poleEmploiAuthentApi.done()
          })
        })

        describe('and is not valid any more because of Unauthorized token', () => {
          beforeEach(() => {
            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_apikey')
              .reply(401)
            poleEmploiAuthentApi
              .post('')
              .query({
                realm: '/partenaire',
                grant_type: 'client_credentials',
                client_id: apiConfiguration.clientId,
                client_secret: apiConfiguration.clientSecret,
                scope: 'api_labonneboitev1 api_offresdemploiv2 application_clientId o2dsoffre'
              })
              .reply(200, {
                scope: 'api_labonneboitev1 api_offresdemploiv2 o2dsoffre',
                expires_in: 1500,
                token_type: 'Bearer',
                access_token: 'fake_new_apikey'
              })

            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_new_apikey')
              .reply(200)
          })

          it('gets a new API key and eventually forwards the request', async () => {
            // WHEN
            await poleEmploiApiService.request('/fakeUrl')
            // THEN
            poleEmploiApi.done()
            poleEmploiAuthentApi.done()
          })
        })

        describe('and upstream API returns error', () => {
          beforeEach(() => {
            // GIVEN
            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_apikey')
              .reply(400)
          })
          it('throws corresponding Boom error', async () => {
            // WHEN
            await poleEmploiApiService.request('/fakeUrl').catch((error) => {
              // THEN
              expect(error).to.have.property('isBoom')
              expect(error.output.statusCode).to.eql(400)
              poleEmploiApi.done()
            })
          })
        })

        describe('and upstream API returns 500 error', () => {
          beforeEach(() => {
            poleEmploiApi
              .get('/fakeUrl')
              .matchHeader('Authorization', 'Bearer fake_apikey')
              .reply(500)
          })
          it('throws corresponding service unavailable error', async () => {
            await poleEmploiApiService.request('/fakeUrl').catch((error) => {
              expect(error).to.have.property('isBoom')
              expect(error.output.statusCode).to.eql(503)
              poleEmploiApi.done()
            })
          })
        })
      })
    })
  })
})
