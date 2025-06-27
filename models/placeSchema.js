const { DataTypes } = require('sequelize');
const {sequelize} = require('../util/databse');

const place = sequelize.define("place", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  placeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situatedIn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  famousFor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
    tableName: 'places',
    timestamps: true
});

module.exports = place;