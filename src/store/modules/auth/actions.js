let timer

export default {
  async login (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },
  async signup (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },
  async auth (context, payload) {
    const mode = payload.mode
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvhrv8KZ3p59nu-egBmsgzjmGbuA7B3yE'

    if (mode === 'signup') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvhrv8KZ3p59nu-egBmsgzjmGbuA7B3yE'
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to auth')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const exprationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpration', exprationDate)

    timer = setTimeout(function () {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    })
  },
  tryLogin (context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpration = localStorage.getItem('tokenExpration')

    const expiresIn = +tokenExpration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      })
    }
  },
  logout (context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpration: null
    })
  },
  autoLogout (context) {
    context.dispatch('logout')
    context.commit('didLogout')
  }
}
