'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Annonces', {
      ID_Annonce: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Membre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres', // Name of the related table
          key: 'ID_Membre'
        },
        onDelete: 'CASCADE' // Delete the announcement if the associated member is deleted
      },
      position_depart: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position_arrive: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      heure: {
        type: Sequelize.TIME,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      place_recherche: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      place_disponible: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prix_par_place: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create an index on the ID_Membre column to improve the performance of join queries
    await queryInterface.addIndex('Annonces', ['ID_Membre']);
  },

  async down(queryInterface, Sequelize) {
    // Drop the Annonces table if necessary
    await queryInterface.dropTable('Annonces');
  }
};
