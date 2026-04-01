const pool = require("../config/db");
const {param} = require("express/lib/application");

// Get /api/dresseurs
// Retourne la liste de tous les dresseurs
const getAllDresseurs = async (req,res) =>{
    try {
        const [rows] = await pool.query("SELECT * FROM dresseur");
        res.json(rows);
    }catch (error) {
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// GET /api/dresseurs/:id
// Retourne un dresseur par son id

const getDresseurById = async (req,res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM dresseur where id_dress = ?",req.params.id);
        if(rows.length === 0){
            return res.status(404).json({message: "Dresseur non trouvé"});
        }
        res.json(rows[0]);
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// GET /api/dresseurs/:id/pokemons
// Retourne les pokémons détenus par un dresseur (avec leurs types)

const getAllPokemonsByDresseurs = async (req,res) =>{
    try {
        const [dresseur] = await pool.query("SELECT * FROM dresseur WHERE dresseur.id_dress = ?", req.params.id);
        const [pokemons] = await pool.query("SELECT * FROM pokemon LEFT JOIN detientpokemon ON pokemon.id_pok = detientpokemon.id_pok WHERE detientpokemon.id_dress = ?;",req.params.id);
        res.json({dresseur,pokemons});
    }catch (error) {
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// POST /api/dresseurs/:id/pokemons
// Ajoute un pokémon à un dresseur
// Body : { id_pok, lvl_pok }

const addPokemonToDresseur = async (req,res) => {
    const {id_pok, lvl_pok } = req.body;

    // 1er contrôle : id et niveau sont renseignés
    if(!id_pok || !lvl_pok){
        return res.status(400).json({message:"Merci de renseigner l'id et le niveau du pokémon"})
    }

    try{
        // 2ème contrôle
        // Vérification que le dresseur existe
        const [rows] = await pool.query("SELECT * FROM dresseur where id_dress = ?",req.params.id);

        if(rows.length === 0){
            return res.status(404).json({message: "Dresseur non trouvé"});
        }

        // 3ème contrôle
        // Vérification que le pokémon existe
        const [pokemon] = await pool.query("SELECT * from pokemon WHERE id_pok = ?",req.params.id);
        if (pokemon.length === 0){
            return res.status(404).json({message: "Pokémon non trouvé"});
        }

        //4ème contrôle
        // Vérification que le dresseur ne possède pas déjà le pokémon
        const [existant] = await pool.query("SELECT id_pok from detientpokemon WHERE id_pok = ? AND id_dress = ?", [id_pok,req.params.id]);
        if (existant.length > 0){
            return res.status(409).json({message: "Le dresseur possède déjà ce pokémon"});
        }

        // Maintenant je fais la requête principale

        await pool.query("INSERT INTO detientpokemon (id_dress,id_pok,lvl_pok) VALUES (?,?,?)",[req.params.id,id_pok,lvl_pok]);
        res.status(201).json({message: "Pokémon ajouté avec succès"})
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}
// PUT /api/dresseurs/:id/pokemons/:id_pok
// Modifie le niveau d'un pokémon détenu par un dresseur
// Body : { lvl_pok }

const updatePokemonLVL = async (req,res) => {


    try{
        await pool.query("UPDATE detientpokemon SET lvl_pok = ? WHERE id_pok = ? AND detientpokemon.id_dress = ?",[req.body.lvl_pok,req.params.id_pok,req.params.id]);
        res.status(202).json({message: "niveau du Pokémon modifié avec succès"});
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

// DELETE /api/dresseurs/:id/pokemons/:id_pok
// Retire un pokémon d'un dresseur

const deletePokemon = async (req,res) => {
    try{
        await pool.query("DELETE FROM detientpokemon WHERE id_pok = ?",req.params.id_pok);
        res.status(202).json({message: "Pokémon supprimé avec succès"})
    }catch (error){
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
}

module.exports = {getAllDresseurs,getDresseurById,getAllPokemonsByDresseurs,addPokemonToDresseur,updatePokemonLVL,deletePokemon};