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
et localhost:3000/api/articles appel la collection = a tester avec postman
 */
router.get('/articles', articleController.afficherArticles);

//Export du module de routing

module.exports = router



