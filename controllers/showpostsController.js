const { catchAsync } = require("../middlewares/error");
const showPostsService = require("../services/showPostsService");

const createShowPost = catchAsync(async (req, res) => {
  const { title, content, imageUrl, runningTime, genreId, startDate, endDate } =
    req.body;
  const showPost = await showPostsService.createShowPost(
    title,
    content,
    imageUrl,
    runningTime,
    genreId,
    startDate,
    endDate
  );
  return res.status(201).json({ message: "Create Complete", showPost });
});

const deleteShowPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  await showPostsService.deleteShowPost(postId, userId);
  return res.status(204);
});

const updateShowPost = catchAsync(async (req, res) => {
  const {
    title,
    content,
    imageUrl,
    runningTime,
    genreId,
    startDate,
    endDate,
    postId,
  } = req.body;
  await showPostsService.updateShowPost(
    title,
    content,
    imageUrl,
    runningTime,
    genreId,
    startDate,
    endDate,
    postId
  );
  return res.status(200).json({ message: "Update Complete" });
});

const getShowPostById = catchAsync(async (req, res) => {
  const { showId } = req.params;
  const result = await showPostsService.getShowPostById(showId);
  await res.status(200).json(result);
});

module.exports = {
  createShowPost,
  deleteShowPost,
  updateShowPost,
  getShowPostById,
};
