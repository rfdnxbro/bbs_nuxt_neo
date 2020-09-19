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
      <v-card>
        <v-card-title class="headline">
          {{ post.subject }} - {{ post.user.name }}
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
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, params }) {
    const response = await $axios.$get(`/v1/posts/${params.id}`)
    return {
      post: response.post
    }
  }
}
</script>
