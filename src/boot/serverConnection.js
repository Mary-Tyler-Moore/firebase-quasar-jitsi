import firebaseService from '../services/firebase'

// "async" is optional
export default ({ router, store, Vue }) => {
  const config = process.env.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  // Auth
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  router.beforeEach(async (to, from, next) => {
    firebaseService.routerBeforeEach(to, from, next, store)
  })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
