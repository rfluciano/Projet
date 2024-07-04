const { DataTypes: sequelizeDataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservations = sequelize.define("reservations", {
    ID_Reservation: {
      type: sequelizeDataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Annonce: {
      type: sequelizeDataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'annonces', 
        key: 'ID_Annonce',
      },
      onDelete: 'CASCADE',
    },
    ID_Membre_Reservant: {
      type: sequelizeDataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'membres', 
        key: 'ID_Membre',
      },
      onDelete: 'CASCADE',
    },
    ID_Membre_Proprietaire: {
      type: sequelizeDataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'membres',
        key: 'ID_Membre',
      },
      onDelete: 'CASCADE',
    },
    PlacesReservees: sequelizeDataTypes.INTEGER,
    Statut: sequelizeDataTypes.STRING,
  });

  Reservations.associate = (models) => {
    Reservations.belongsTo(models.annonces, {
      foreignKey: 'ID_Annonce',
      onDelete: 'CASCADE',
    });

    Reservations.belongsTo(models.membres, {
      as: 'Reservant', 
      foreignKey: 'ID_Membre_Reservant', 
      onDelete: 'CASCADE',
    });

    Reservations.belongsTo(models.membres, {
      as: 'Proprietaire', 
      foreignKey: 'ID_Membre_Proprietaire',
      onDelete: 'CASCADE',
    });
  };

  return Reservations;
};
