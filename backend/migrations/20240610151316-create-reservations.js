// migrations/XXXXXX-create-reservations.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      ID_reservation: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_membre_proprietaire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres',
          key: 'ID_Membre',
        },
      },
      ID_membre_reservant: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres',
          key: 'ID_Membre',
        },
      },
      ID_annonce: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Annonces',
          key: 'ID_Annonce',
        },
        onDelete: 'CASCADE',
      },
      PlacesReservees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Statut: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'En attente',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  },
};
