const { dataSource } = require("./dataSource");

const createPost = async (
  userId,
  postTypeId,
  title,
  content,
  imageUrl,
  rating,
  showId
) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO posts (
        user_id,
        post_type_id,
        title,
        content,
        image_url,
        rating,
        show_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, postTypeId, title, content, imageUrl, rating, showId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getPosts = async (post_type_id) => {
  try {
    const posts = await dataSource.query(
      `SELECT
      p.id,
      p.user_id,
      p.post_type_id,
      p.title,
      p.content,
      p.image_url,
      p.rating,
      p.show_id
    FROM posts p
    WHERE post_type_id = ?`,
      [post_type_id]
    );
    return posts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const updatePost = async (userId, postId, title, content, imageUrl, rating) => {
  try {
    const result = await dataSource.query(
      `UPDATE posts
        SET 
        title = ?,
        content = ?,
        image_url = ?,
        rating = ?
        WHERE id = ?
        AND user_id = ?`,
      [title, content, imageUrl, rating, postId, userId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const deletePost = async (userId, postId) => {
  try {
    const result = await dataSource.query(
      `DELETE FROM
        posts
        WHERE id = ?
        AND user_id = ?`,
      [postId, userId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getPostById = async (userId, postId) => {
  try {
    const posts = await dataSource.query(
      `SELECT
        p.id,
        p.user_id,
        p.post_type_id,
        p.title,
        p.content,
        p.image_url,
        p.rating,
        p.show_id
      FROM posts p
        WHERE id = ?
        AND user_id = ?`,
      [postId, userId]
    );
    return posts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const postVotePost = async (userId, postId, opinion) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO post_votes (
        users_id,
        post_id,
        opinion
      ) VALUES (?, ?, ?)`,
      [userId, postId, opinion]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getPostComments = async (postId) => {
  try {
    const result = await dataSource.query(
      `
      SELECT * FROM comments
      WHERE post_id = ?
      `,
      [postId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getPostVote = async (userId, postId) => {
  try {
    const result = await dataSource.query(
      `SELECT * FROM
      post_votes
      WHERE user_id = ?
      AND post_id = ?`,
      [userId, postId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
  postVotePost,
  getPostVote,
  getPostComments,
};
