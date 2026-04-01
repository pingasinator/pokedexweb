// Chargement des variables d'env
require("dotenv").config();

//Import du module
const express = require("express");
const cors = require("cors");
const {request} = require("express");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

//Création de l'app Express
const app = express();

//Autoriser les requêtes cross-origin
app.use(cors());

//Parser le body des requêtes (JSON)
app.use(express.json());

// Parser les données de formulaire (URL-encoded)
app.use(express.urlencoded({extended:true}));

// Import des routes
const pokemonRoutes = require("./routes/pokemons");
const dresseurRoutes = require("./routes/dresseurs");

//Route d'accueil
app.get("/",(req, res) => {
    res.json({
        message: "API REST Pokedex",
        endpoints: {
            pokemons: "/api/pokemons",
            dresseurs: "/api/dresseurs"
        }
    })
});

// Route pour les pokemons
app.use("/api/pokemons", pokemonRoutes);

// Route pour les dresseurs
app.use("/api/dresseurs", dresseurRoutes);

// Démarage du serveur
app.listen(PORT, HOST,()=>{
    console.log(`Serveur démarre sur http://${HOST}:${PORT}`);
})