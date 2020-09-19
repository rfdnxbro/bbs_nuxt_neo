<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <n-link to="/">
        <v-toolbar-title v-text="title" />
      </n-link>
      <v-spacer />
      <span v-if="logged_in">
        {{ current_user.name }}さん
      </span>
      <v-btn
        v-if="logged_in"
        icon
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon
        to="/sign_up"
        nuxt
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Sample bbs'
    }
  },
  computed: {
    current_user () {
      return this.$store.getters.user
    },
    logged_in () {
      return this.$store.getters.logged_in
    }
  },
  async beforeMount () {
    const session = JSON.parse(window.localStorage.getItem('bbs_session'))
    if (session && Object.keys(session.auth).length) {
      await this.$axios.$get('/v1/auth/validate_token')
        .then(data => this.$store.commit('setUser', data.data))
        .catch(() => {
          this.$store.commit('setUser', null)
          this.$store.commit('setAuth', {})
        })
    }
  }
}
</script>
