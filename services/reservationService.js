const { v4: uuid } = require("uuid");
const reservationDao = require("../models/reservationDao");

const createReservation = async (
  userId,
  seatsId,
  point,
  quantity,
  totalPrice
) => {
  if (!userId || !seatsId || !quantity || !totalPrice) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 401;
    throw error;
  }

  const reservationNumber = uuid();

  return await reservationDao.createReservation(
    userId,
    seatsId,
    point,
    quantity,
    totalPrice,
    reservationNumber
  );
};
module.exports = {
  createReservation,
};
