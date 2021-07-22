<template>
  <div class="container mt-2">
    <h1>Détails de l'article : <b class="text-danger">{{article.title}} </b></h1>
    <img class="img-fluid mt-2" :src="article.image" :alt="article.title" :title="article.title" width="25%">
    <p class="mt-4">Ecrit par : <em class="text-info">{{ article.auteur }}</em></p>
    <p class="articles">{{article.contenus}}</p>
    <button @click="supprimerArticle" class="btn btn-danger">Supprimer</button>
    <nuxt-link :to="'/articles/' + article._id + '/editer'" class="btn btn-warning">Editer</nuxt-link>
    <nuxt-link to="/" class="btn btn-success">Retour</nuxt-link>

  </div>

</template>

<script>


export default {
  name: "index",
  head:{
    title: 'DETAILS ARTICLE',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: "Cette page contient les détails de chaque articles et les accès au CRUD"
      }
    ],
  },

  data(){
    return{
      article:'',
    }
  },
  methods:{
    afficherArticleParId(context){
      context.$axios.get('/api/articles/' + context.$route.params.id)
        .then(response => {
          this.article = response.data
        })
        .catch(erreur => {
          console.log("Pas d'article pour cet id !" + erreur)
        })
    },
    supprimerArticle(){
      if(confirm("Supprimer l'article ?") === true){
        this.$axios.delete('/api/articles/' + this.$route.params.id)
          .then(response => {
            if(response.data._id){
              //Redirection
              this.$router.push({
                name: 'index',
                path: '/',
                component: 'pages/index.vue'
              })
                .catch(erreur => {
                  console.log('Impossible de supprimer cet article car il est protégé !' + erreur)
                })
            }
          })
      }
    }
  },
  mounted() {
    this.afficherArticleParId(this)
  }
}
</script>

<style scoped>

</style>
