const wishService = require("../services/wishService");
const { catchAsync } = require("../middlewares/error");

const createWish = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { showId } = req.body;
  if (!userId || !showId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  await wishService.createWish(userId, showId);
  res.status(201).json({ message: "CREATED_WITHLIST" });
});

const getWishList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const wishData = await wishService.getWishList(userId);

  return res.status(200).json({ wishData });
});

const deleteWishList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { wishId } = req.query;
  await wishService.deleteWishList(userId, wishId);

  return res.status(204).send();
});

module.exports = {
  createWish,
  getWishList,
  deleteWishList,
};
