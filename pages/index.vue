<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card v-for="post in posts" :key="post.id">
        <v-card-title class="headline">
          <n-link :to="`/posts/${post.id}`">
            {{ post.subject }} - {{ post.user.name }}
          </n-link>
        </v-card-title>
        <v-card-text>
          {{ post.body }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async fetch ({ store }) {
    const posts = await store.dispatch('posts/fetchPosts')
    store.commit('posts/setPosts', posts.posts)
  },
  computed: {
    posts () {
      return this.$store.getters['posts/posts']
    }
  }
}
</script>
