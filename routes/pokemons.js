const express = require("express");
const router = express.Router();
const {getAllPokemons, getPokemonById,getPokemonTypesById,getPokemonEvolutionsById} = require("../controllers/pokemonsController");

// Route qui liste tous les pokémons
router.get("/", getAllPokemons);
// Route qui ramène un pokemon par son id
router.get("/:id", getPokemonById);
// Route qui liste les types d'un pokemon
router.get("/:id/types", getPokemonTypesById);
// Route qui liste les évoulutions d'un pokemon
router.get("/:id/evolutions", getPokemonEvolutionsById);
module.exports = router;