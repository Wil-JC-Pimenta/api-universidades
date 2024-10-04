// database.js
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
