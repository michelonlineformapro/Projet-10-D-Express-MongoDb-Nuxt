<template>
  <div class="container">
    <ul class="list-group" v-if="articles.length">
      <li
        class="list-group-item"
        v-for="article in articles"
        :key="article.id"
      >
        {{article.title}}

      </li>
    </ul>


    <div v-else>
      <div class="alert alert-danger">PAS DE RESULTAT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
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
    //A l'aafichage de la page on appel la fonction
    this.afficherTousLesArticles(this)
  }


}
</script>
