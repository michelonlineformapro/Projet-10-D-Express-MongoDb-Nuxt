//Import du Article model
const ArticleModel = require('../models/articles.model');

//Afficher tous les _id
module.exports.afficherArticles = ((request, response) => {
  //Appel du model + les elements de mongoose
  ArticleModel.find({}, ((err, articles) => {
    if(err){
      //Si aucun resultat
      return response.status(500).json({
        message: "Aucun article trouber dans la collection !"
      })
    }else{
      //Si on trouve des _id dans la collection
      return response.json(articles)
    }
  }));
});

//Afficher un article fonction articleParId appelée dans le router
module.exports.articleParId = ((request, response) => {
  //Recuperer objet id dans le router (localhost:3000/api/_id/:id)'
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

//Supprimer un article



module.exports.supprimerCetArticle = ((request, response) => {
  //Recuperer objet id dans le router (localhost:3000/api/_id/:id)'
  let id = request.params.id;

  //findByIdAndRemove -> prend en paramètre un filtre et une fonction
  ArticleModel.findByIdAndRemove(id, ((erreur, article) => {
    if(erreur){
      return response.status(500).json({
        message: "Aucun article pour cet object ID !"
      })
    }
    //Sinon on supprimer
    return response.json(article);
  }));
});


//Ajouter un article
module.exports.ajouterArticle = ((request, response) => {
  //Recuperation des données du formulaire (on parse les données dans requète HTTP body)
  let article = new ArticleModel({
    title: request.body.title,
    auteur: request.body.auteur,
    image: request.body.image,
    contenus: request.body.contenus,
  });

  //On sauvegarde les données du formulaire grace a express et la fonction save
  article.save((erreur, article) =>{
    //Si on detecte une erreur
      if(erreur){
        response.status(500).json({
          message: "Erreur lors de la creation de l'article" + erreur
        })
      }else{
        //Sinon in sauve les données en retournant un objet json
        response.status(201).json({
          message: "Ok c bon",
          _id: article._id
        })
      }
  });
});

//Mise a jour d'un article
module.exports.mettreAJourArticle = ((request, response) => {
  //Recuperation de id (route localhost:3000/api/articles/:id)
  let id = request.params.id;
  ArticleModel.findOne({_id: id}, (error, article) => {
    //Si id n'existe pas
    if(error){
      response.status(500).json({
        messeage: "Erreur de mise a jour de l'article" + error
      })
      //Si id existe mais pas de données
    }else if(!article){
      return  response.status(404).json({
        message: "Pas de données pour cet ID"
      })
      //Sinon on retourne les données sous forme d'un objet json
    }else{
      //Si les données change (request.body) on remplace les données par les nouvelles sinon on garde les anciennes (article.title)
      article.title = request.body.title ? request.body.title : article.title;
      article.auteur = request.body.auteur ? request.body.auteur : article.auteur
      article.image = request.body.image ? request.body.image : article.image
      article.contenus = request.body.contenus ? request.body.contenus : article.contenus

      //Quand les données changent on sauvegarde grace a express.save()
      article.save((err, article) => {
        //Si on detecte une erreur
        if(err){
          response.status(500).json({
            message: "Erreur de la mise de jour de l'article" + err
          })
          //Si ca marche on retourne un objet json avec les nouvelles données de l'objet article
        }else{
          return response.json(article)
        }
      })
    }
  })
})
