const Joi = require('@hapi/joi')

exports.statusSchema = Joi.object({
  version: Joi.string().description('Current API version').required(),
  sha1: Joi.string().description('Current git commit sha1').required()
})
  .label('Status response')
  .description('JSON response for API status health check')
