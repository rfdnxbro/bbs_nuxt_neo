export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    config.headers = store.getters.auth
  })

  $axios.onResponse((response) => {
    if (response.headers['access-token']) {
      const authHeaders = {
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        expiry: response.headers.expiry,
        uid: response.headers.uid
      }
      store.commit('setAuth', authHeaders)
    }
  })

  $axios.onError((error) => {
    return Promise.reject(error.response)
  })
}
