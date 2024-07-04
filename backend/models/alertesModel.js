const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous d'importer votre instance Sequelize correcte

const Alerte = sequelize.define('Alerte', {
  ID_Alerte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_Membre_Proprietaire: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_Membre_Reservant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_Annonce: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Date_Alerte: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Statut_Alerte: {
    type: DataTypes.STRING('En attente', 'Acceptée', 'Refusée'),
    defaultValue: 'En attente'
  }
}, {
  tableName: 'Alertes', // Nom de la table dans la base de données
  timestamps: false // Désactive les timestamps (created_at, updated_at)
});

module.exports = Alerte;
