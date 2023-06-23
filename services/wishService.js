const wishDao = require("../models/wishDao");

const createWish = async (userId, showId) => {
  return wishDao.createWish(userId, showId);
};

const getWishList = async (userId) => {
  return wishDao.getWishList(userId);
};

const deleteWishList = async (userId, wishId) => {
  if (!wishId) {
    const error = new Error("INVALID_WISHID");
    error.statusCode = 400;
    throw error;
  }
  return wishDao.deleteWishList(userId, wishId);
};

module.exports = {
  createWish,
  getWishList,
  deleteWishList,
};
