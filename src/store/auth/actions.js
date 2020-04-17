import { Notify } from 'quasar'
// import { firestoreAction } from 'vuexfire'
// import User from '../../models/User.js'
// import { createPusherUser } from '../../services/pusher'

// export const addUserToUsersCollection = async (state, userRef) => {
//   const user = new User({
//     email: state.email
//   })
//   try {
//     await userRef.set(user)
//     return user
//   } catch (err) {
//     return `[addUserToUsersCollection] Error: ${err}`
//   }
// }

// export const createNewUser = async function ({ dispatch, commit }, data) {
//   const $fb = this.$fb
//   const { email, password } = data
//   commit('common/setLoading', true, { root: true })
//   try {
//     const fbAuthResponse = await $fb.createUserWithEmail(email, password)
//     const id = fbAuthResponse.user.uid
//     const userRef = $fb.userRef('users', id)
//     const newUserTransaction = await Promise.all([
//       addUserToUsersCollection({ email }, userRef),
//       createPusherUser(id, email)
//     ])
//     await dispatch('common/initUserChatServices', id, { root: true })
//     const user = newUserTransaction[0]
//     commit('user/setCurrentUserData', user, { root: true })
//     commit('common/setLoading', false, { root: true })
//     return user
//   } catch (err) {
//     Notify.create({
//       message: `An error as occured: ${err}`,
//       color: 'negative'
//     })
//     commit('common/setLoading', false, { root: true })
//   }
// }

export const signInWithGoogle = async function ({ commit }) {
  const $fb = this.$fb
  try {
    const user = await $fb.loginWithGoogle()
    return user
  } catch (err) {
    Notify.create({
      message: `An error as occured: ${err}`,
      color: 'negative'
    })
  }
}

export const forgotPassword = async function ({ commit }, email) {
  const $fb = this.$fb
  commit('common/setLoading', true, { root: true })
  try {
    await $fb.resetPassword(email)
    commit('common/setLoading', false, { root: true })
    Notify.create({
      message: 'An email was sent to the email you registered with to reset your password',
      color: 'positive'
    })
  } catch (err) {
    Notify.create({
      message: `An error as occured: ${err}`,
      color: 'negative'
    })
    commit('common/setLoading', false, { root: true })
  }
}

export const loginUser = async function ({ commit, dispatch }, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  commit('common/setLoading', true, { root: true })
  try {
    const res = await $fb.loginWithEmail(email, password)
    commit('common/setLoading', false, { root: true })
    return res.user
  } catch (err) {
    Notify.create({
      message: `An error as occured: ${err}`,
      color: 'negative'
    })
    commit('common/setLoading', false, { root: true })
  }
}

export const logoutUser = async function ({ commit }, id) {
  // await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('users', id) })
  // await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('users') })
  // await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('contacts') })
  await this.$fb.logoutUser()
  // commit('common/setLeftDrawerOpen', false, { root: true })
}

export const sendEmailVerification = async function ({ commit }) {
  const $fb = this.$fb
  try {
    await $fb.sendEmailVerification()
    return true
  } catch (err) {
    Notify.create({
      message: `An error as occured: ${err}`,
      color: 'negative'
    })
    return (false)
  }
}
