const showDao = require("../models/showDao");

const getShowList = async (
  showId,
  genreId,
  address,
  title,
  orderBy,
  limit,
  offset,
  userId
) => {
  return showDao.getShowList(
    showId,
    genreId,
    address,
    title,
    orderBy,
    limit,
    offset,
    userId
  );
};

const getShowDetail = async (userId, showId) => {
  return showDao.getShowDetail(userId, showId);
};

const getAllShows = async (userId, limit, offset) => {
  return showDao.getAllShows(userId, limit, offset);
};

module.exports = {
  getShowList,
  getShowDetail,
  getAllShows,
};
