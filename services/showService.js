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

module.exports = {
  getShowList,
  getShowDetail,
};
