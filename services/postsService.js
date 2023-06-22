const postsDao = require('../models/postsDao')

const createPost = async ( userId, postTypeId, title, content, imageUrl, rating, showId) => {
  const post = await postsDao.createPost( userId, postTypeId, title, content, imageUrl, rating, showId );
  return post;
};

const getPosts = async (post_type_id) => {
  const posts = await postsDao.getPosts(post_type_id);
  return posts;
};

const updatePost = async ( userId, postId, title, content, imageUrl, rating) => {
  const post = await postsDao.updatePost( userId, postId, title, content, imageUrl, rating);
  return post;
};

const deletePost = async ( userId, postId ) => {
  await postsDao.deletePost( userId, postId );
};

const getPostById = async (userId, postId) => {
  const posts = await postsDao.getPosts(userId, postId);
  return posts;
};

const agreePost = async (userId, postId) => {
  const posts = await postsDao.postVotePost(userId, postId, 'AGREE');
  return posts;
};

const disagreePost = async (userId, postId) => {
  const posts = await postsDao.postVotePost(userId, postId, 'DISAGREE');
  return posts;
};

const getPostComments = async (postId) => {
  const comments = await postsDao.getPostComments(postId);
  return comments;
};

const getPostsWithCommentsAndVotes = async (post_type_id, userId) => {
  const posts = await getPosts(post_type_id);
  const enhancedPosts = [];

  for (const post of posts) {
    const comments = await getPostComments(post.id);
    const vote = await getPostVote(userId, post.id);

    const enhancedPost = {
      ...post,
      comments,
      vote,
    };

    enhancedPosts.push(enhancedPost);
  }

  return enhancedPosts;
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
  agreePost,
  disagreePost,
  getPostsWithCommentsAndVotes
};
