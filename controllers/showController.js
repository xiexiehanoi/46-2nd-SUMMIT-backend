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
  const { showId } = req.params;
  const userId = req.user?.id;
  const result = await showService.getShowDetail(showId, userId);
  return res.status(200).json(result);
});

const getAllShows = catchAsync(async (req, res) => {
  const All = await showService.getAllShows();
  return res.status(200).json(All);
});

module.exports = {
  getShowDetail,
  getShowList,
  getAllShows,
};
