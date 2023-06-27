const showPostsDao = require("../models/showpostsDao");

const createShowPost = async (
  title,
  content,
  imageUrl,
  runningTime,
  genreId,
  startDate,
  endDate
) => {
  const showPost = await showPostsDao.createShowPost(
    title,
    content,
    imageUrl,
    runningTime,
    genreId,
    startDate,
    endDate
  );
  return showPost;
};

const deleteShowPost = async (postId) => {
  const result = await showPostsDao.deleteShowPost(postId);
  return result;
};

const updateShowPost = async (
  title,
  content,
  imageUrl,
  runningTime,
  genreId,
  startDate,
  endDate,
  postId
) => {
  const result = await showPostsDao.updateShowPost(
    title,
    content,
    imageUrl,
    runningTime,
    genreId,
    startDate,
    endDate,
    postId
  );
  return result;
};

const getShowPostById = async (showId) => {
  const showPost = await showPostsDao.getShowPostById(showId);
  return showPost;
};

const getAllShowPosts = async (title) => {
  const showPosts = await showPostsDao.getAllShowPosts(title);
  return showPosts;
};

module.exports = {
  createShowPost,
  deleteShowPost,
  updateShowPost,
  getShowPostById,
  getAllShowPosts,
};
