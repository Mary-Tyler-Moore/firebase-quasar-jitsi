
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Notify } from 'quasar'

/**
 * Returns Firebase 's global namespace from which all Firebase services are accessed
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} Firebase Module
 */
export const self = () => {
  return firebase
}

/**
 * Firebase's auth interfact method
 * https: //firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} currentUser object from firebase
 */
export const auth = () => {
  return firebase.auth()
}

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable
 *
 * @return {Promise} - authPromise
 */
export const ensureAuthIsInitialized = async (store) => {
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      resolve(user)
      unsubscribe()
    }, () => {
      reject('Looks like there is a problem with the firebase service. Please try again later')
    })
  })
}

/** Convienience method to initialize firebase app
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

/**
 * @param  {Object} store - Vuex store
 */
export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

/**
 * remove firebase auth token
 */
export const logoutUser = () => {
  return auth().signOut()
}

/** Handle the auth state of the user and
 * set it in the auth store module
 * @param  {Object} store
 * @param  {Object} currentUser
 */
export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthStateSet = isAuthenticated(store)
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true,
    isSignedIn: currentUser !== null,
    uid: currentUser ? currentUser.uid : ''
  })

  // Get & bind the current user
  // if (store.state.auth.isSignedIn) {
  //   await store.dispatch('user/getCurrentUser', currentUser.uid)

  // }

  // If the user looses authentication route
  // them to the login page
  if (!currentUser && initialAuthStateSet) {
    store.dispatch('common/routeUserToAuth')
  }
}

/**
 * @param  {Stirng} email - email from reset password form
 */
export const resetPassword = (email) => {
  return auth().sendPasswordResetEmail(email)
}

// Navigational Guards
/**
 * @param  {Object} to - From Vue Router
 * @param  {Object} from - From Vue Router
 * @param  {Object} next - From Vue Router
 */
export const routerBeforeEach = async (to, from, next, store) => {
  try {
    await ensureAuthIsInitialized(store)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isAuthenticated(store)) {
        next()
      } else {
        next('/auth')
      }
    } else if ((to.path === '/auth' && isAuthenticated(store))) {
      next('/')
    } else {
      next()
    }
  } catch (err) {
    Notify.create({
      message: `${err}`,
      color: 'negative'
    })
  }
}
