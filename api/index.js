//import d' express
const express = require('express');

//Appel du fichier de connexion a mongodb
const db = require('./db');


//Instance du framework express
const app = express();

//Transformer les objet en objet JSon string et array
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

//Import des routes articles
const articlesRoutes = require('./routes/articles.routes');

//Utilisé les route avec le framework express
app.use(articlesRoutes);

//Export du module

module.exports = {
  path: '/api',
  handler: app
}
