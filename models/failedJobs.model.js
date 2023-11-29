const { DataTypes } =require("sequelize");
const database = require("../database/connection");

const FailedJobs = database.define('failed_jobs',{
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = FailedJobs;