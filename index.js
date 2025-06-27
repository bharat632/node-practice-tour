const express = require('express');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoutes');
const tourRouter = require("./routes/tourRoutes");
const placeRoutes = require("./routes/placeRoutes");
const activityRoutes = require("./routes/activityRoutes");

dotenv.config({ path: './config.env' })
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);    //user Routes
app.use("/api/v1/tours", tourRouter);    //tour routes
app.use("/api/v1/places", placeRoutes);  //place routes
app.use("/api/v1/activities", activityRoutes);  //activity routes

module.exports = app;