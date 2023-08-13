//importing modules
const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(config.dbConfig.dbName, config.dbConfig.dbUser,config.dbConfig.dbPassword, {
    dialect: 'postgres',
    port: config.dbConfig.port,
    host: config.dbConfig.host,
}
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./userModel")(sequelize, DataTypes);
db.events = require("./eventModel")(sequelize, DataTypes);

//exporting the module
module.exports = db;
