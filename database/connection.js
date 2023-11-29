const { Sequelize } = require('sequelize');

const { DB, USER, PASSWORD, HOST, DIALECT } = require("../config/db.conf");

const database = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT
});
database
  .sync({ force: true })
  .then(() => {
    console.info("database synced");
  })
  .catch((err) => {
    console.error("failed to sync database: " + err.message);
  });


module.exports = database;