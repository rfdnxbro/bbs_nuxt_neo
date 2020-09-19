export const state = () => ({
  user: null,
  auth: {},
  logged_in: false
})

export const getters = {
  user (state) {
    return state.user
  },
  logged_in (state) {
    return state.logged_in
  },
  auth (state) {
    return state.auth
  }
}

export const mutations = {
  setUser (state, value) {
    state.logged_in = !!value
    state.user = value
  },
  setAuth (state, value) {
    state.auth = value
  }
}

export const actions = {
  async signUp (_c, user) {
    return await this.$axios.$post('/v1/auth', user)
  }
}
