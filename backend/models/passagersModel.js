const { DataTypes: sequelizeDataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Passagers = sequelize.define("passagers", {
        ID_Passager: {
            type: sequelizeDataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'membres',
                key: 'ID_Membre'
            }
        }
    });

    return Passagers;
};
