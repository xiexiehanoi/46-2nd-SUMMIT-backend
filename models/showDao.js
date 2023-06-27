const { dataSource } = require("./dataSource");
const builder = require("./queryBuilder");

const getShowList = async (
  showId,
  address,
  genreId,
  title,
  orderBy,
  limit,
  offset,
  userId
) => {
  try {
    const whereCondition = builder.filterBuilder(
      showId,
      address,
      genreId,
      title
    );
    const orderQuery = builder.orderByBuilder(orderBy);
    const limitQuery = builder.limitBuilder(limit, offset);
    const shows = await dataSource.query(
      `
      SELECT
        s.id AS showId,
        s.title AS title,
        s.content AS showDetail,
        s.image_url AS imageUrl,
        s.running_time AS runningTime,
        s.genre_id AS genre,
        s.start_date AS startDate,
        s.end_date AS endDate,
        GROUP_CONCAT(DISTINCT t.name) AS theaterNames,
        COUNT(DISTINCT w.id) AS countWish,
        w2.id AS wishId,
        (w2.id IS NOT NULL) as isWished,
       (
        SELECT ROUND(AVG(p.rating),1) FROM posts AS p WHERE p.show_id = s.id AND p.post_type_id = 1
       ) AS averageRating,
       (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
         'grade', ss.grade,
         'age', ss.age,
         'price', ss.price,
         'theater', ss.theater_id,
         'runningTime', ss.showtime_id,
         'ticket', ss.available_ticket,
         'seatStatus', ss.status_id
       ))
      FROM show_seats AS ss
          INNER JOIN show_seats_status AS sss
          ON sss.id = ss.status_id
          INNER JOIN show_times AS st
          ON st.id = ss.showtime_id
          INNER JOIN theaters AS t
          ON t.id = ss.theater_id
          WHERE ss.show_id = s.id
          ) AS seatsDetail
      FROM shows AS s
      INNER JOIN show_seats as ss
      ON ss.show_id = s.id
      LEFT JOIN posts AS p
      ON p.id = s.id
      INNER JOIN genres AS g
      ON g.id = s.genre_id
      INNER JOIN theaters AS t
      ON t.id = ss.theater_id
      LEFT JOIN wish_list AS w 
      ON w.show_id = s.id
      LEFT JOIN wish_list AS w2
      ON w2.show_id = s.id AND w2.user_id = ?
        ${whereCondition}
        GROUP BY s.id
        ${orderQuery}
        ${limitQuery}
        `,
      [userId, showId]
    );
    return { shows };
  } catch (err) {
    const error = new Error("INVALID_DATA_LIST");
    error.statusCode = 400;
    throw error;
  }
};

const getShowDetail = async (userId, showId) => {
  try {
    const showDetail = await dataSource.query(
      `
      SELECT
        s.id AS showId,
        s.title AS title,
        s.content AS showDetail,
        s.image_url AS imageUrl,
        s.running_time AS runningTime,
        s.genre_id AS genre,
        s.start_date AS startDate,
        s.end_date AS endDate,
        GROUP_CONCAT(DISTINCT t.name) AS theaterNames,
        COUNT(DISTINCT w.id) AS countWish,
        w2.id AS wishId,
        (w2.id IS NOT NULL) as isWished,
       (
        SELECT ROUND(AVG(p.rating),1) FROM posts AS p WHERE p.show_id = s.id AND p.post_type_id = 1
       ) AS averageRating,
       (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
         'grade', ss.grade,
         'age', ss.age,
         'price', ss.price,
         'theater', ss.theater_id,
         'runningTime', ss.showtime_id,
         'ticket', ss.available_ticket,
         'seatStatus', ss.status_id
       ))
      FROM show_seats AS ss
          INNER JOIN show_seats_status AS sss
          ON sss.id = ss.status_id
          INNER JOIN show_times AS st
          ON st.id = ss.showtime_id
          INNER JOIN theaters AS t
          ON t.id = ss.theater_id
          WHERE ss.show_id = s.id
          ) AS seatsDetail
      FROM shows AS s
      INNER JOIN show_seats as ss
      ON ss.show_id = s.id
      LEFT JOIN posts AS p
      ON p.id = s.id
      INNER JOIN genres AS g
      ON g.id = s.genre_id
      INNER JOIN theaters AS t
      ON t.id = ss.theater_id
      LEFT JOIN wish_list AS w 
      ON w.show_id = s.id
      LEFT JOIN wish_list AS w2
      ON w2.show_id = s.id AND w2.user_id = ?
      WHERE s.id = ?
            `,
      [userId, showId]
    );
    const reviews = await dataSource.query(
      `
    SELECT
    p.title as title,
    p.content as content,
    p.rating as rating
    FROM posts as p
    WHERE p.show_id = ?
            `,
      [showId]
    );
    const reviewCount = reviews.length;
    return { showDetail, reviews, reviewCount };
  } catch (err) {
    const error = new Error("INVALID_DATA_LIST");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getShowList,
  getShowDetail,
};
