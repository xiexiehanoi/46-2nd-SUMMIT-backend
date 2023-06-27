const express = require("express");
const {
  checkLogInToken,
  optionalCheckLogInToken,
} = require("../middlewares/auth");

const showController = require("../controllers/showController");

const router = express.Router();

router.get("/:showId", optionalCheckLogInToken, showController.getShowDetail);
router.get("", optionalCheckLogInToken, showController.getShowList);
module.exports = {
  router,
};
