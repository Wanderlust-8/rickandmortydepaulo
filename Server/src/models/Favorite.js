const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Favorite', {
      idChar: {
         type: DataTypes.INTEGER,
         // primaryKey: true,
         allowNull: false,
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
         allowNull: false,
      },
      species: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      gender: {
         type: DataTypes.ENUM('Male', 'Female', 'Genderless', 'unknown'),
         allowNull: false,
      },
      origin: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   }, { timestamps: false });
};


// module.exports = (sequelize) => {
//    sequelize.define('Favorite', {
//       id: {
//          type: DataTypes.INTEGER,
//          autoIncrement: true,
//          primaryKey: true,
//       },
//       userId: {
//          type: DataTypes.INTEGER,
//          unique: false,
//          allowNull: false,
//       },
//       CharId: {
//          type: DataTypes.INTEGER,
//          unique: false,
//          allowNull: false,
//       },
//       name: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       },
//       origin: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       },
//       status: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       },
//       image: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       },
//       species: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       }, gender: {
//          type: DataTypes.STRING,
//          unique: false,
//          allowNull: false,
//       },
//    }, { timestamps: false });
// };
