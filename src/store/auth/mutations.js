export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
  state.isSignedIn = data.isSignedIn
  state.uid = data.uid
}
