const { checkLogInToken } = require("../middlewares/auth");
const express = require("express");

const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.post("", checkLogInToken, reservationController.createReservation);

module.exports = { router };
