const express = require("express");

const placeController = require("../controller/placeController");
const router = express.Router();

router
  .route("/")
  .get(placeController.getAllPlaces)
  .post(placeController.createPlace);
router
  .route("/:id")
  .get(placeController.getPlace)
  .delete(placeController.deletePlace)
  .patch(placeController.updatePlace);

module.exports = router;
