const Sequelize = require("sequelize");

const sequelize = new Sequelize('tours', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });


const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        // await sequelize.sync({ force: true });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { connection, sequelize } 