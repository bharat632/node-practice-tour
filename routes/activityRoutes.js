const express = require("express");
const activityController = require("../controller/activityController");

const router = express.Router();

router
  .route("/")
  .get(activityController.getAllActivity)
  .post(activityController.createActivity);
router
  .route("/:id")
  .get(activityController.getActivity)
  .patch(activityController.updateActivity)
  .delete(activityController.deleteActivity);

module.exports = router;
