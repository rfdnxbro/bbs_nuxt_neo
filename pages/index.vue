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
      <form v-if="logged_in" @submit.prevent="newPost">
        <v-card>
          <v-card-title class="headline">
            新規投稿
          </v-card-title>
          <v-card-text>
            <ul v-if="errors">
              <li v-for="(message, key) in errors" :key="key">
                {{ key }}
                <span v-for="(m, i) in message" :key="i">
                  {{ m }}
                </span>
              </li>
            </ul>
            <v-text-field
              id="subject"
              v-model="subject"
              label="subject"
              name="subject"
              prepend-icon="mdi-subtitles"
            />
            <v-textarea
              id="body"
              v-model="body"
              label="body"
              name="body"
              prepend-icon="mdi-comment-text"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit">
              投稿
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
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
  data () {
    return {
      subject: '',
      body: '',
      errors: []
    }
  },
  computed: {
    posts () {
      return this.$store.getters['posts/posts']
    },
    logged_in () {
      return this.$store.getters.logged_in
    }
  },
  methods: {
    async newPost () {
      try {
        await this.$store.dispatch('posts/newPost', {
          subject: this.subject,
          body: this.body
        })
        this.subject = ''
        this.body = ''
        this.errors = []
      } catch (e) {
        this.errors = e.data.errors
      }
      const posts = await this.$store.dispatch('posts/fetchPosts')
      this.$store.commit('posts/setPosts', posts.posts)
    }
  }
}
</script>
