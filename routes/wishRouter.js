const express = require("express");
const { checkLogInToken } = require("../middlewares/auth");

const wishController = require("../controllers/wishController");

const router = express.Router();

router.post("/create", checkLogInToken, wishController.createWish);
router.get("", checkLogInToken, wishController.getWishList);
router.delete("", checkLogInToken, wishController.deleteWishList);

module.exports = {
  router,
};
