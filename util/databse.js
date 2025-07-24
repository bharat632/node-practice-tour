const Sequelize = require("sequelize");

const sequelize = new Sequelize('tours', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });

function associations(){
  // imports
  const User = require("../models/userSchema");
  const Tour = require("../models/tourSchema");
  const Place = require("../models/placeSchema");
  const Activity = require("../models/activitySchema");
  const TourActivity = require("../models/tourActivitySchema");

  // associations
  // User.hasMany(Tour, { foreignKey: 'userId' });
  // Tour.belongsTo(User, { foreignKey: 'userId' });

  // One tour can have many users
  Tour.hasMany(User, {
    foreignKey: "tourId",
    as: "users",
    onDelete: "SET NULL", // If tour is deleted, user.tourId becomes NULL
    onUpdate: "CASCADE",
  });

  // A user belongs to one tour (optional)
  User.belongsTo(Tour, {
    foreignKey: "tourId",
    as: "tour",
    onDelete: "SET NULL", // When tour is deleted, don't delete user
  });

  Tour.hasMany(Place, { foreignKey: "tourId" });
  Place.belongsTo(Tour, { foreignKey: "tourId" });

  Tour.belongsToMany(Activity, { through: TourActivity, foreignKey: "tourId" });
  Activity.belongsToMany(Tour, {
    through: TourActivity,
    foreignKey: "activityId",
  });

  // Tour.belongsToMany(Activity, {
  //   through: TourActivity, // ✅ Use imported model here
  //   foreignKey: 'tourId',
  //   otherKey: 'activityId',
  //   as: 'activities'
  // });

  // // Activity model
  // Activity.belongsToMany(Tour, {
  //   through: TourActivity,
  //   foreignKey: 'activityId',
  //   otherKey: 'tourId',
  //   as: 'tours'
  // });
}

const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        associations();
        await sequelize.sync({ alter: true });
        // await sequelize.sync({ force: true });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { connection, sequelize } 