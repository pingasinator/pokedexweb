const express = require("express");
const router = express.Router();
const {getAllDresseurs,getDresseurById,getAllPokemonsByDresseurs,addPokemonToDresseur,updatePokemonLVL,deletePokemon} = require("../controllers/dresseursController");

// Route qui liste tous les dresseurs
router.get("/",getAllDresseurs);
// Route qui ramène un dresseur par son id
router.get("/:id",getDresseurById);
// Route qui liste tous les pokémons d'un dresseur
router.get("/:id/pokemons",getAllPokemonsByDresseurs);
// Route qui ajoute un pokémon à un dresseur
router.post("/:id/addpokemon",addPokemonToDresseur);
// Route qui modifie le niveau d'un des pokémons du dresseur
router.put("/:id/pokemons/:id_pok",updatePokemonLVL);
// Route qui supprime un des pokémon d'un dresseur
router.delete("/:id/pokemons/:id_pok",deletePokemon);

module.exports = router;