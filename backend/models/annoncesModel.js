const { DataTypes: sequelizeDataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Annonces = sequelize.define(
    "annonces",
    {
      ID_Annonce: {
        type: sequelizeDataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ID_Membre: {
        type: sequelizeDataTypes.INTEGER,
        allowNull: false,
      },
      position_depart: {
        type: sequelizeDataTypes.STRING,
        allowNull: false,
      },
      position_arrive: {
        type: sequelizeDataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: sequelizeDataTypes.DATE,
        // defaultValue: sequelizeDataTypes.NOW,
        allowNull: false,
      },
      heure: {
        type: sequelizeDataTypes.TIME,
        allowNull: false,
      },
      role: {
        type: sequelizeDataTypes.STRING,
        allowNull: false,
      },
      place_recherche: {
        type: sequelizeDataTypes.INTEGER,
        allowNull: true,
      },
      place_disponible: {
        type: sequelizeDataTypes.INTEGER,
        allowNull: false,
      },
      prix_par_place: {
        type: sequelizeDataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Annonces.associate = (models) => {
    Annonces.belongsTo(models.membres, {
      foreignKey: "ID_Membre",
      onDelete: "CASCADE",
    });
    Annonces.hasMany(models.reservations, {
      foreignKey: "ID_Annonce",
      onDelete: "CASCADE",
    });
  };

  return Annonces;
};
