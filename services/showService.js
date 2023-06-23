const showDao = require("../models/showDao");

const getShowList = async (
  showId,
  genreId,
  address,
  title,
  orderBy,
  limit,
  offset
) => {
  return showDao.getShowList(
    showId,
    genreId,
    address,
    title,
    orderBy,
    limit,
    offset
  );
};

const getShowDetail = async (showId) => {
  return showDao.getShowDetail(showId);
};

const getAllShows = async () => {
  return showDao.getAllShows();
};

module.exports = {
  getShowList,
  getShowDetail,
  getAllShows,
};
