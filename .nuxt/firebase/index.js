import createApp from './app.js'

import authService from './service.auth.js'
import databaseService from './service.database.js'
import firestoreService from './service.firestore.js'
import storageService from './service.storage.js'
import functionsService from './service.functions.js'
import messagingService from './service.messaging.js'
import performanceService from './service.performance.js'
import analyticsService from './service.analytics.js'
import remoteConfigService from './service.remoteConfig.js'
import appCheckService from './service.appCheck.js'

const appConfig = {"apiKey":"AIzaSyC9TgnMnzX0-2Z5gN5UqcGueRJSscccD48","authDomain":"fishsix-f41a8.firebaseapp.com","databaseURL":"https:\u002F\u002Ffishsix-f41a8-default-rtdb.asia-southeast1.firebasedatabase.app","projectId":"fishsix-f41a8","storageBucket":"fishsix-f41a8.appspot.com","messagingSenderId":"814600327192","appId":"1:814600327192:web:6543815e1b2df159c4336d","measurementId":"G-DDENZ16EJD"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    databaseService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),
    storageService(session, firebase, ctx, inject),
    functionsService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      databaseService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),
      storageService(session, firebase, ctx, inject),
      functionsService(session, firebase, ctx, inject),
      messagingService(session, firebase, ctx, inject),
      performanceService(session, firebase, ctx, inject),
      analyticsService(session, firebase, ctx, inject),
      remoteConfigService(session, firebase, ctx, inject),
      appCheckService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    database,
    firestore,
    storage,
    functions,
    messaging,
    performance,
    analytics,
    remoteConfig,
    appCheck
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    database: database,
    firestore: firestore,
    storage: storage,
    functions: functions,
    messaging: messaging,
    performance: performance,
    analytics: analytics,
    remoteConfig: remoteConfig,
    appCheck: appCheck
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}