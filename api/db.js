//import de mongoose
const mongoose = require('mongoose');

//Connexion a mongodb via mongoose
mongoose.connect('mongodb://localhost/ecommerce',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

//Check si il y a des erreurs
db.on('error', console.error.bind('console', 'Erreur de connexion à MongoDB'));

//Si ca marche
db.once('open', () => {
  console.log("Connexion a mongoDB : OK")
});

// Export du module a importer dans index.js pour le serveur express
module.exports = db;
