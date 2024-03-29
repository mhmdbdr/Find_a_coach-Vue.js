export default {
  userId (state) {
    return state.userId
  },
  token (state) {
    return state.token
  },
  isAuthent (state) {
    return !!state.token
  },
  didAutoLogout (state) {
    return state.didLogout
  }
}
