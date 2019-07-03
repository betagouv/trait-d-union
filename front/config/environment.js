'use strict'

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'front',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      TU_FF_SWIPE_MODE: process.env.TU_FF_SWIPE_MODE === 'on' || false,
      apiUrl: process.env.API_URL || 'https://api.traitdunion.beta.gouv.fr',
      typeformUrl: process.env.TYPEFORM_URL
    },

    googleFonts: [
      'Noto+Sans:300,400,700,900'
    ],

    // Set or update content security policies
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' www.google-analytics.com",
      'img-src': "'self'",
      'style-src': "'self' fonts.googleapis.com",
      'media-src': "'self'"
    },

    crisp: {
      WEBSITE_ID: '5ef81484-322d-41e4-a58a-dc141f7eda98'
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: process.env.GA_ID,
          // Use `analytics_debug.js` in development
          debug: false, // environment === 'development',
          // Use verbose tracing of GA events
          trace: false, // environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development'
        }
      }
    ]
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
    ENV.APP.autoboot = false
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV
}
