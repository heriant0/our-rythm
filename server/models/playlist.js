'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        static associate(models) {
            Playlist.belongsTo(models.User)
        }
    };
    Playlist.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required!"
                },
                notEmpty: {
                    msg: "Password is required!"
                }
            }
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "album is required!"
                },
                notEmpty: {
                    msg: "album is required!"
                }
            }
        },
        preview: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "preview is required!"
                },
                notEmpty: {
                    msg: "preview is required!"
                }
            }
        },
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Playlist',
    });
    return Playlist;
};