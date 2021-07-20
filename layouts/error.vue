<template>

  <div class="container">
    <div class="alert alert-danger p-3 mt-3" v-if="error.statusCode === 404">404 PAGE NON TROUVÉE</div>

    <div class="alert alert-secondary" v-else>Une erreur est survenue</div>

    <nuxt-link to="/" class="btn btn-info mt-3">Retour</nuxt-link>

  </div>

</template>

<script>
export default {
  name: "error",
  props: ['error'],
  layout: 'error'
}
</script>

<style scoped>

</style>
