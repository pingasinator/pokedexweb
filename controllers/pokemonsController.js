const pool = require("../config/db");
const {param} = require("express/lib/application");

// GET /api/pokemons
// Retourne la liste de tous les pokemons
const getAllPokemons = async (req,res) =>{
    try{
        const [rows] = await pool.query("SELECT * from pokemon ORDER BY id_pok");
        res.json(rows);
    } catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// GET /api/pokemons/:id
// Retourne un pokemon par son id
const getPokemonById = async (req,res) => {
    // id présent dans l'url d'appel
    try{
        const [rows] = await pool.query("SELECT * from pokemon WHERE id_pok = ?",req.params.id);
        if (rows.length === 0){
            return res.status(404).json({message: "Pokémon non trouvé"});
        }
        res.json(rows[0]);
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}
// GET /api/pokemons/:id/types
// Retourne le type d'un pokemon

const getPokemonTypesById = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT * from esttype WHERE id_pok = ?",req.params.id);
        res.json(rows);
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// GET /api/pokemon/:id/evolutions
// Retourne les évolutions d'un pokemon

const getPokemonEvolutionsById = async (req,res) => {
    try{
        const [rows] = await pool.query("SELECT * from pokemon LEFT JOIN evolueen on pokemon.id_pok = evolueen.id_pok_base WHERE id_pok_base = ?",req.params.id);
        res.json(rows);
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

module.exports = {getAllPokemons,getPokemonById,getPokemonTypesById,getPokemonEvolutionsById}