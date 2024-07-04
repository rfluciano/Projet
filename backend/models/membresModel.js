const { DataTypes: sequelizeDataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'votre_clé_secrète';

module.exports = (sequelize) => {
    const Membres = sequelize.define("membres", {
        ID_Membre: {
            type: sequelizeDataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type: sequelizeDataTypes.STRING,
            allowNull: false
        },
        Prenom: {
            type: sequelizeDataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: sequelizeDataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        MotDePasse: {
            type: sequelizeDataTypes.STRING,
            allowNull: false
        },
        NumeroTelephone: {
            type: sequelizeDataTypes.STRING,
            allowNull: false
        },
        TypeMembre: {
            type: sequelizeDataTypes.STRING,
            allowNull: true
        },
        Token: sequelizeDataTypes.STRING,
        photo: { // Ajout du champ photo
            type: sequelizeDataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        hooks: {
            async beforeCreate(membre) {
                const hashedPassword = await bcrypt.hash(membre.MotDePasse, 8);
                membre.MotDePasse = hashedPassword;
            }
        }
    });

    Membres.prototype.generateToken = async function() {
        const token = jwt.sign({ id: this.ID_Membre }, secretKey);
        this.Token = token;
        await this.save();
        return token;
    };

    Membres.findByCredentials = async function(email, password) {
        const membre = await this.findOne({ where: { Email: email } });
        if (!membre) {
            throw new Error('Adresse e-mail incorrecte');
        }
        const isMatch = await bcrypt.compare(password, membre.MotDePasse);
        if (!isMatch) {
            throw new Error('Mot de passe incorrect');
        }
        return membre;
    };

    Membres.associate = (models) => {
        Membres.hasMany(models.annonces, {
            foreignKey: 'ID_Membre',
            onDelete: 'CASCADE'
        });
        Membres.hasMany(models.reservations, {
            foreignKey: 'ID_Membre_Reservant',
            onDelete: 'CASCADE'
        });
    };

    return Membres;
};
