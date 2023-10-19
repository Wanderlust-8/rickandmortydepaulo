require('dotenv').config();
require('pg');
const { Sequelize } = require('sequelize');

const { DB_DEPLOY } = process.env;

// const DB_USER = process.env.DB_USER || 'postgres';
// const DB_PASSWORD = process.env.DB_PASSWORD || 'summeror2020';
// const DB_HOST = process.env.DB_HOST || 'localhost';
// const DB_PORT = process.env.DB_PORT || 5432;
// const DB_NAME = process.env.DB_NAME || 'rickandmorty';
// const SECURE = process.env.SECURE || false;

const UserModel = require('../src/models/User');
const FavoriteModel = require('../src/models/Favorite');

// let strConn = '';
// if (SECURE) {
//    // conexión segura (para BDD remota):
//    strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
// } else {
//    strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// }

// const database = new Sequelize(
//    strConn,
//    { logging: false, native: false }
// );

const database = new Sequelize(
   DB_DEPLOY,
   { logging: false,
     native: false,
     dialectOptions: {
       ssl: {
         require: true,
         rejectUnauthorized: false, // Solo para desarrollo local. En producción, configúralo correctamente.
       },
     },
   }
 );

UserModel(database);
FavoriteModel(database);
// Relacionar modelos:
const { User, Favorite } = database.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
   User,
   Favorite,
   conn: database,
};
