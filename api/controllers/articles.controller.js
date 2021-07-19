//Import du Article model
const ArticleModel = require('../models/articles.model');

//Afficher tous les articles
module.exports.afficherArticles = ((request, response) => {
  //Appel du model + les elements de mongoose
  ArticleModel.find({}, ((err, articles) => {
    if(err){
      //Si aucun resultat
      return response.status(500).json({
        message: "Aucun article trouber dans la collection !"
      })
    }else{
      //Si on trouve des articles dans la collection
      return response.json(articles)
    }
  }))
})
