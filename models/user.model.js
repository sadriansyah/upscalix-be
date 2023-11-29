const { DataTypes } = require("sequelize");
const database = require("../database/connection");

const User = database.define("users", {
    firstName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday : {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;