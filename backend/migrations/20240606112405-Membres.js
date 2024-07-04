'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Membres', {
      ID_Membre: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Assurez-vous de définir l'email comme unique si c'est une contrainte de votre base de données
      },
      MotDePasse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      NumeroTelephone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TypeMembre: {
        type: Sequelize.STRING // Peut-être que cela devrait être un type ENUM plutôt qu'une chaîne de caractères
      },
      Token: {
        type: Sequelize.STRING
      },
      photo: { // Ajout du champ photo
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Membres');
  }
};
