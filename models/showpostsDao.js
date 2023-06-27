const { dataSource } = require("./dataSource");

const createShowPost = async (
  title,
  content,
  imageUrl,
  runningTime,
  genreId,
  startDate,
  endDate
) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO shows (
        title,
        content,
        image_url,
        running_time,
        genre_id,
        start_date,
        end_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, content, imageUrl, runningTime, genreId, startDate, endDate]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const deleteShowPost = async (postId) => {
  try {
    const result = await dataSource.query(
      `DELETE FROM
       shows 
       WHERE id = ?
       `,
      [postId]
    );
    if (result.affectedRows !== 1) {
      throw new Error("FAILED_TO_UPDATE_DATA");
    }
    return result;
  } catch (err) {
    const error = new Error(err.message || "INVALID_DATA_INPUT");
    error.statusCode = err.statusCode || 400;
    throw error;
  }
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
  try {
    const result = await dataSource.query(
      `UPDATE shows SET
      title = ?,
      content = ?,
      image_url = ?,
      running_time = ?,
      genre_id = ?,
      start_date = ?,
      end_date = ?
      WHERE id = ?`,
      [
        title,
        content,
        imageUrl,
        runningTime,
        genreId,
        startDate,
        endDate,
        postId,
      ]
    );
    if (result.affectedRows !== 1) {
      throw new Error("FAILED_TO_UPDATE_DATA");
    }
    return result;
  } catch (err) {
    const error = new Error(err.message || "INVALID_DATA_INPUT");
    error.statusCode = err.statusCode || 400;
    throw error;
  }
};

const getShowPostById = async (showId) => {
  try {
    const result = await dataSource.query(
      `
      SELECT
      id,
      title,
      content,
      image_url,
      running_time,
      genre_id,
      start_date,
      end_date
      FROM shows
      WHERE id = ?
      `,
      [showId]
    );
    return result;
  } catch (err) {
    const error = new Error("GET_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createShowPost,
  deleteShowPost,
  updateShowPost,
  getShowPostById,
};
