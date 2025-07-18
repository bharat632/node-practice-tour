const {sequelize} = require('../util/databse');
const { DataTypes } = require("sequelize");
const Tour = require('../models/tourSchema');
const Activity = require('../models/activitySchema');

const tourActivity = sequelize.define("tourActivity", {
    tourId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Tour,
            key: 'id'
        }
    },
    activityId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Activity,
            key: 'id'
        }
    }
},
{
    tableName: "tourActivity",
    timestamps: false
})

module.exports = tourActivity;