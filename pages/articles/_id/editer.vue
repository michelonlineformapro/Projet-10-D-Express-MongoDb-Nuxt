<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <h1 class="text-center text-warning">MISE A JOUR DE ATICLE {{article.title}}</h1>

    <!--Fomulaire de mise a jour methode post et appel de la fonction update a la soumission-->
    <!--preventDefault evite le rechargement de la page-->
    <form method="post" @submit.prevent="mettreAJourParID">
      <!--Les champs-->
      <div class="mb-3">
        <label for="title">Titre de l'article</label>
        <input
          type="text"
          id="title"
          required
          :placeholder="article.title"
          class="form-control"

          v-model="article.title" name="title"
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
        <input type="submit" value="Mettre à jour" class="btn btn-outline-secondary mr-3">
        <nuxt-link class="btn btn-outline-danger" to="/">Annuler</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "editer",
  data(){
    return{
      id:"",
      title:"",
      auteur:"",
      image:"",
      contenus:"",
      article:""
    }
  },

  methods:{
    //On recupere les données de l'aticle pour les injectés dans le formulmaire
    afficherArticleParId(context) {
      //Requète http methode get + url + recupération de id dans le back api localhost:3000/api/articles/:id
      context.$axios.get('/api/articles/' + context.$route.params.id)
        //Creation d'une promesse
      .then(response => {
        //Si ca marche le paramètre article (data-binding) = reponse (données de la collection)
        this.article = response.data
      })
        //Sinon on declenche une erreur
      .catch(err => {
        console.log("Pas d'article pour cet id" + err)
      })
    },

    //Mise a jour de l'article appelée a la soumission du formulaire (@submit.prevent="fonction" et <button type submit>
    mettreAJourParID(){
      //Requète http methode put + url du back + recup de id (localhost:3000/api/articles/:id)
      this.$axios.put('/api/articles/' + this.$route.params.id,{
        //Les propriétés initialisé dans le data-binding = valeur du formulaire
        title: this.article.title,
        auteur: this.article.auteur,
        image: this.article.image,
        contenus: this.article.contenus
      })
        //Creation d'une promesse
      .then(response => {
        //Si id et données sont correct
        if(response.data._id){
          confirm("L'article a été mis a jour avec succès" + response)
          //Redirection vers la page d'accueil
          this.$router.push({
            name: 'index',
            path: '/',
            component: 'pages/index.vue'
          })
        }
      })
        //Sinon on declenche une erreur
      .catch(error => {
        console.log("Erreur de mise a jour " + error)
      })
    }
  },
  //Cycle de vie de nuxt -> a l'affichage de la page on appel la fonction pour recupérer les anciennes données
  mounted() {
    this.afficherArticleParId(this)
  }

}
</script>

<style scoped>

</style>
