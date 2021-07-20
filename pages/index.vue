<template>
  <div>
    <div class="container-fluid text-center">
      <img src="~/assets/img/banner.png" alt="Nuxt Logo" title="Nuxt Logo">
    </div>

    <div class="container mt-2">

      <div class="d-flex justify-content-between align-items-center">
        <h1 class="text-info">Articles</h1>
        <nuxt-link to="/articles/ajouter" class="btn btn-success">Ajouter un articles</nuxt-link>
      </div>


      <div class="list-group" v-if="articles.length">
        <!--Au clic sur l'article on appel la page de détails grace a nuxt link-->
        <!--Url = localhost:3000/objetcID ex: 60f3ea30dbfa5c1920a1b815-->
        <!--pages/_id/index.vue-->
        <nuxt-link
          class="list-group-item list-group-item-action mt-2"
          :to="'/' + article._id"
          v-for="article in articles"
          :key="article.id">
          <h6 class="text-white bg-danger p-3 mt-2">{{ article.title }}</h6>

          <div class="row">
            <div class="col-md-6 col-sm-12 animate__animated animate__slideInLeft">
              <img class="img-fluid mt-2" :src="article.image" :alt="article.title" :title="article.title" width="50%">
            </div>

            <div class="col-md-6 col-sm-12 animate__animated animate__slideInRight">
              <p class="mt-4">Ecrit par : <em class="text-info">{{ article.auteur }}</em></p>
              <p class="articles">{{article.contenus}}</p>
            </div>
          </div>
          <br />
        </nuxt-link>
      </div>

    <div v-else>
      <div class="alert alert-danger">PAS DE RESULTAT</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "index",
  //SEO meta
  head: {
    title: "ACCUEIL - Articles -"
  },
  //Data-binding = getter et setter
  data(){
    return{
      //Tableau des articles
      articles: []
    }
  },
  methods:{
    //Creation d'une fonction pour afficher les articles
    //n passe un element en paramètre
    afficherTousLesArticles(context){
      //le paramètre (contexte = this) appel axios et la methode get http
      //Puis url pour afficher les valeur de la collection tester avec postman
      context.$axios.get('/api/articles')
      //Pr0messe
      .then(response => {
        //On rempli le tableau des données avec la collection
        this.articles = response.data
      })
        //Sinon on declenche une erreur
      .catch(err => {
        console.log("Erreur de la requète HTTP :" + err)
      })
    }
  },
  //Cycle de vie Vuejs (instance + beforeCreated + created + beforeMounted + mounted)
  mounted() {
    //A l'affichage de la page on appel la fonction
    this.afficherTousLesArticles(this)
  }


}
</script>
