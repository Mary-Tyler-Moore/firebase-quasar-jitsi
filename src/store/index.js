import Vue from 'vue'
import Vuex from 'vuex'
import {
  vuexfireMutations
} from 'vuexfire'

import auth from './auth'
import common from './common'
// import members from './members'
// import rooms from './rooms'
// import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      common
      // members,
      // rooms,
      // user
    },
    mutations: {
      ...vuexfireMutations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
