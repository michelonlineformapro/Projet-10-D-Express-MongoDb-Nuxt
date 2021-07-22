//Import mongoose

const mongoose = require('mongoose');
//Appel de la fonction model (Schema) de monggose
const Schema = mongoose.Schema;

//Instance du model + reprise de tous les elements de la collection db = ecommerce/_id
const ArticleModel = new Schema({
  title: {type: String, required:true, index:{unique: true}},
  auteur: {type: String, required: true},
  image: {type: String, required: true},
  contenus: {type: String, required: true},
})

//Export du module nom l'objet + appel du model + nom de la collection
module.exports = mongoose.model('articles', ArticleModel, 'articles');
