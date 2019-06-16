const SibApiV3Sdk = require('sib-api-v3-sdk')

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = sendinblueApiKey

module.exports = new SibApiV3Sdk.ContactsApi()
