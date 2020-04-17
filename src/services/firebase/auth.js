import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * @param {String} email - A Valid email
 * @param {String} password - Password
 *
 * @return {Promist} UserCredentials
 */
export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}
