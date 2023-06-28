const { dataSource } = require("./dataSource");

const createWish = async (userId, showId) => {
  try {
    await dataSource.query(
      `
      INSERT INTO wish_list (
        user_id, 
        show_id
      ) VALUES (?, ?)
      `,
      [userId, showId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_LIST");
    error.statusCode = 400;
    throw error;
  }
};

const getWishList = async (userId) => {
  try {
    const result = await dataSource.query(
      `
            SELECT
            w.id,
            w.show_id,
            s.title,
            s.image_url
            FROM wish_list w
            INNER JOIN shows s
            ON s.id = w.show_id
            WHERE user_id =?
            `,
      [userId]
    );
    const countWish = result.length;
    return { result, countWish };
  } catch (err) {
    const error = new Error("INVALID_DATA_LIST");
    error.statusCode = 400;
    throw error;
  }
};

const deleteWishList = async (userId, wishId) => {
  try {
    await dataSource.query(
      `
            DELETE
            FROM wish_list
            WHERE user_id = ? AND wish_list.id IN (?)
            `,
      [userId, wishId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_LIST");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createWish,
  getWishList,
  deleteWishList,
};
