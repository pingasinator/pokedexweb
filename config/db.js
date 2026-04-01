const mysql = require("mysql2/promise");

// Pool de connexion à la bdd (réutilise les connexions au lie d'encréer une par requête)
const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
})

module.exports = pool;

