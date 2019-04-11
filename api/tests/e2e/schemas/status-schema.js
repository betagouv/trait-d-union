const Joi = require('joi')

exports.statusSchema = Joi.object({
  version: Joi.string().description('Current API version').required()
})
