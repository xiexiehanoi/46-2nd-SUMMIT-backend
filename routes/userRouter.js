const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/kakao-login", userController.signInKakao);

module.exports = { router };
