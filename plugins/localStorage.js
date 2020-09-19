import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'bbs_session',
    paths: [
      'auth'
    ]
  })(store)
}
