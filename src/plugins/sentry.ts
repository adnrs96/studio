import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN || '',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}

export default Sentry
