'use strict';
const { hashPassword } = require('../helper/bcrypt')

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "name is required"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "email is required!"
                },
                isEmail: {
                    msg: "your email is not valid"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Password is required!"
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                const hasedPassword = hashPassword(user.password);
                user.password = hasedPassword;
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};