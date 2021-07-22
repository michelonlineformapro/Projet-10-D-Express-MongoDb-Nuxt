//Appel express router
const { Router } = require('express');

const router = Router();

//Appel du controller
const articleController = require('../controllers/articles.controller');

//Route de base methode GET
//Attention dans index.js lors de l'export on spécifie un chemin
/*
  module.exports = {
  path: '/api',
  handler: app
}
donc le chemin localhost:3000 appel index.vue
et localhost:3000/api/_id appel la collection = a tester avec postman
 */
router.get('/articles', articleController.afficherArticles);

//Route pour afficher le details d'un article /:id = request.params.id dans le controller
//Test postman : localhost:3000/api/_id/objectId ex: 60f3ea30dbfa5c1920a1b815
router.get('/articles/:id', articleController.articleParId)


//Supprimer un article
//Methode delete localhost:3000/api/articles/:id -> sur postman
router.delete('/articles/:id', articleController.supprimerCetArticle)

//Creation d'un article
router.post('/articles', articleController.ajouterArticle)

//Mise a jour des articles
router.put('/articles/:id', articleController.mettreAJourArticle)

//Export du module de routing


module.exports = router



