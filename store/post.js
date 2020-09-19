export const state = () => ({
  posts: []
})

export const getters = {
  posts (state) {
    return state.posts
  }
}

export const mutations = {
  setPosts (state, data) {
    state.posts = data
  }
}

export const actions = {
  async fetchPosts () {
    return await this.$axios.$get('/v1/posts')
  }
}
