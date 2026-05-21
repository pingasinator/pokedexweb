const express = require("express");
const router = express.Router();
const {getAllPokemons, getPokemonById,getPokemonTypesById,getPokemonEvolutionsById,getPokemonBaseById,getPokemonDescriptionById} = require("../controllers/pokemonsController");

// Route qui liste tous les pokémons
router.get("/", getAllPokemons);
// Route qui ramène un pokemon par son id
router.get("/:id", getPokemonById);
// Route qui liste les types d'un pokemon
router.get("/:id/types", getPokemonTypesById);
// Route qui liste les évolutions d'un pokemon
router.get("/:id/evolutions", getPokemonEvolutionsById);
// Route qui ramène la base d'un pokemon
router.get("/:id/base", getPokemonBaseById);
// Route qui liste les déscriptions d'un pokemon
router.get("/:id/description", getPokemonDescriptionById);
module.exports = router;