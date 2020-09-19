<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <form @submit.prevent="signUp">
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>SignUp form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <ul v-if="errors">
                    <li v-for="(message, i) in errors.full_messages" :key="i">
                      {{ message }}
                    </li>
                  </ul>
                  <v-text-field
                    id="name"
                    v-model="name"
                    label="name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    id="email"
                    v-model="email"
                    label="email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="email"
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" type="submit">
                    登録
                  </v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    async signUp () {
      try {
        const data = await this.$store.dispatch('signUp', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.$store.commit('setUser', data.data)
        this.$router.push('/')
      } catch (e) {
        this.errors = e.data.errors
      }
    }
  }
}
</script>
