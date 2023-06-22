const postsService = require("../services/postsService");
const { catchAsync } = require("../middlewares/error");

const createPost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postTypeId, title, content, imageUrl, rating, showId } = req.body;
  await postsService.createPost(
    userId,
    postTypeId,
    title,
    content,
    imageUrl,
    rating,
    showId
  );
  return res.status(201).json({ messge: "Create Complete" });
});


const getPosts = catchAsync(async (req, res) => {
  const post_type_id = req.params;
  const postData = await postsService.getPosts(post_type_id);
  return res.status(200).json(postData);
});

const updatePost = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { postId } = req.params;
  const { title, content, imageUrl, rating } = req.body;
  await postsService.updatePost( userId, postId, title, content, imageUrl, rating );
  return res.status(200).json({ messge: "Update Complete" });
});

const deletePost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  await postsService.deletePost( userId, postId );
  return res.status(204);
});

const getPostById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  await postsService.getPostById( userId, postId );
  return res.status(200);

})

const agreePost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const result =  await postsService.agreePost( userId, postId );
  return res.status(200);
});

const disagreePost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  await postsService.disagreePost( userId, postId );
  return res.status(200);
});

const getAllPosts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const post_type_id = req.params.post_type_id;
  const posts = await postsService.getPostsWithCommentsAndVotes(post_type_id, userId);
  return res.status(200).json({ message: "Get Complete", posts });
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
  agreePost,
  disagreePost,
  getAllPosts
};
