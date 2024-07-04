const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            idle: dbConfig.pool.idle,
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.membres = require('./membresModel.js')(sequelize, DataTypes);
db.annonces = require('./annoncesModel.js')(sequelize, DataTypes);
db.reservations = require('./reservationsModel.js')(sequelize, DataTypes);

// Assurer que les associations sont définies
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronization successful');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

module.exports = db;
