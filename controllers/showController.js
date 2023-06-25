const showService = require("../services/showService");
const { catchAsync } = require("../middlewares/error");

const getShowList = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  let { showId, genreId, address, title, orderBy, limit, offset } = req.query;
  const showData = await showService.getShowList(
    showId,
    genreId,
    address,
    title,
    orderBy,
    limit,
    offset,
    userId
  );
  res.status(200).json(showData);
});

const getShowDetail = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { showId } = req.params;
  const result = await showService.getShowDetail(userId, showId);
  return res.status(200).json(result);
});

const getAllShows = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { limit, offset } = req.params;
  const All = await showService.getAllShows(userId, limit, offset);
  return res.status(200).json(All);
});

module.exports = {
  getShowDetail,
  getShowList,
  getAllShows,
};
