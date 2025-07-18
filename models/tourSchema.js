  const { DataTypes } = require('sequelize');
  const { sequelize } = require('../util/databse');

  const tour = sequelize.define(
    "tour",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
      },
      cityName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      endDate: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false, // or true, depending on your logic
        references: {
          model: 'users',
          key: 'id'
        }
      },
    },
    {
      tableName: "tours",
      timestamps: true,
    }
  );

  // (async () => {
  //   await sequelize.sync({ force: true });
  //   // Code here
  // })();

  module.exports = tour;