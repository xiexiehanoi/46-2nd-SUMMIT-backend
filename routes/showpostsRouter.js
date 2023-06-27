const express = require("express");
const showpostsController = require("../controllers/showpostsController");
const { checkLogInToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/all/:showId", showpostsController.getShowPostById);
router.post("/create", checkLogInToken, showpostsController.createShowPost);
router.delete("/:postId", checkLogInToken, showpostsController.deleteShowPost);
router.patch("/patch", checkLogInToken, showpostsController.updateShowPost);

module.exports = { router };
