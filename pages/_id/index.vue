<template>
  <div class="container">

      <h1 class="text-center text-warning mt-3">Détails de l'article {{ article.title }}</h1>
      <div id="details-article" class="mt-3">
        <div class="row">

          <div class="col-md-6 col-sm-12">
            <h3 class="text-warning mt-3">{{ article.title }}</h3>
            <img :src="article.image" :alt="article.title" :title="article.title" class="img-thumbnail"/>
          </div>

          <div class="col-md-6 col-sm-12">
            <p class="mt-4">Ecrit par : <em class="text-info">{{ article.auteur }}</em></p>
            <p class="articles">{{article.contenus}}</p>
          </div>
        </div>
        <nuxt-link to="/" class="btn btn-info mt-3">Retour</nuxt-link>
      </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      //Init de la propriété article
      article: ''
    }
  },
  methods:{

    afficherArticleParId(context){
      //Requete HTTP pour recuperer un article (url du back + routing article/:id)
      context.$axios.get('/api/articles/' + context.$route.params.id)
      //Promesse
      .then(response => {
        //La props article de vient la data json
        this.article = response.data
      })
      .catch(e => {
        console.log("Pas d'article pour cet id" + e)
      })
    }
  },
  //instance de Vuejs + beforeCreate + created + beforeMount + monted
  mounted() {
    this.afficherArticleParId(this)
  }
}
</script>

<style scoped>
  #details-article{
    background-color: #2a2e33;
    padding: 20px;
    color: white;
  }
</style>
