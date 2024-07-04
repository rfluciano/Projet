'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alertes', {
      ID_Alerte: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Membre_Proprietaire: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ID_Membre_Reservant: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ID_Annonce: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Date_Alerte: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      Statut_Alerte: {
        type: Sequelize.ENUM('En attente', 'Acceptée', 'Refusée'),
        defaultValue: 'En attente'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alertes');
  }
};
