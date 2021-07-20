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
  }));
});

//Afficher un article fonction articleParId appelée dans le router
module.exports.articleParId = ((request, response) => {
  //Recuperer objet id dans le router (localhost:3000/api/articles/:id)'
  let id = request.params.id;
  //Requète HTTP appel du model + fonction expresse findOne + filtre _id (objetct id = id)
  ArticleModel.findOne({_id: id}, (erreur, article) => {
    if(erreur){
      //Si aucun resultat
      return response.status(500).json({
        message: "Aucun article pour cet object ID !"
      })
      //Si article trouvé mais pas de données
    }else if(!article){
      return  response.status(404).json({
        message: "Pas de données pour cet ID"
      })
      //Sinon on retourne les données sous forme d'un objet json
    }else{
      return response.json(article)
    }
  });
});
