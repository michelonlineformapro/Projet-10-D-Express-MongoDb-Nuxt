<template>
  <div class="container">
    <h1 class="text-danger text-center mt-3">AJOUTER UN ARTICLE</h1>

    <form method="post" @submit.prevent="validerForm()">

      <div class="mb-3">
        <label for="title">Titre de l'article</label>
        <input
          type="text"
          id="title"
          required
          class="form-control"
          v-model="article.title"
          name="title"
        />
      </div>

      <div class="mb-3">
        <label for="auteur">Auteur de l'article</label>
        <input
          type="text"
          id="auteur"
          required
          class="form-control"
          v-model="article.auteur"
          name="auteur"
        />
      </div>


      <div class="mb-3">
        <label for="image">Image de l'article</label>
        <input
          type="text"
          id="image"
          required
          class="form-control"
          v-model="article.image"
          name="image"
        />
      </div>

      <div class="mb-3">
        <label for="contenus">Contenus de l'article</label>
        <textarea
          rows="5"
          id="contenus"
          required
          class="form-control"
          v-model="article.contenus"
          name="contenus"
        ></textarea>
      </div>

      <div class="mb-3">
        <input type="submit" value="Ajouter" class="btn btn-outline-primary mr-3">
        <nuxt-link class="btn btn-outline-danger" to="/">Annuler</nuxt-link>
      </div>


    </form>

  </div>
</template>

<script>
export default {
  name: "ajouter",
  head:{
    title: 'AJOUTER ARTICLE',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: "Cette page est destinée à ajouter des articles avec Nuxt Express et MongoDB"
      }
    ],
  },



  data(){
    return{
      article:{
        id:"",
        title:"",
        auteur:"",
        image:"",
        contenus:""
      }
    }
  },

  methods:{
    validerForm(){
      this.$axios.post('/api/articles',{
        id: this.article.id,
        title: this.article.title,
        auteur: this.article.auteur,
        image: this.article.image,
        contenus: this.article.contenus
      })
      .then(response => {
        console.log(response)
        this.article.id = response.data.id
        //Redirection
        this.$router.push({
          name: 'index',
          path: '/',
          component: 'pages/index.vue'
        })
      })
      .catch(err => {
        console.log("Erreur" + err)
      })
    }
  }
}
</script>

<style scoped>

</style>
