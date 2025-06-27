const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/databse");

const activity = sequelize.define(
  "activity",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    activityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is18plus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "activities",
    timestamps: true,
  }
);

module.exports = activity;
