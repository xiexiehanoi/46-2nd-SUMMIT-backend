function filterBuilder(showId, genreId, address, title) {
  let conditionArr = [];

  if (showId) {
    conditionArr.push(`s.id = ${showId}`);
  }
  if (genreId) {
    conditionArr.push(`g.id = ${genreId}`);
  }

  if (address) {
    conditionArr.push(`t.region = '${address}'`);
  }

  if (title) {
    const titleSearch = /^[A-Za-z가-힣]+$/;
    if (!titleSearch.test(title)) {
      const error = new Error("CANT_READ_TITLE");
      error.statusCode = 400;
      throw error;
    }
    conditionArr.push(`s.title LIKE '%${title}%'`);
  }

  let whereCondition = "";
  if (conditionArr.length > 0) {
    whereCondition = `WHERE ${conditionArr.join(" AND ")}`;
  }
  return whereCondition;
}

function orderByBuilder(orderBy) {
  let orderQuery = "";
  if (!orderBy) {
    return (orderQuery = "ORDER BY s.id");
  }
  const orderBySelect = Object.freeze({
    ratingAsc: "ORDER BY averageRating ASC",
    ratingDesc: "ORDER BY averageRating DESC",
    startDesc: "ORDER BY startDate DESC, s.start_date DESC",
    endDesc: "ORDER BY endDate DESC, s.end_date DESC",
    wishDesc: "ORDER BY countWish DESC, s.id DESC",
  });
  return (orderQuery = orderBySelect[orderBy]);
}

function limitBuilder(limit, offset) {
  if (!limit && !offset) {
    return `LIMIT ${(limit = 8)} OFFSET ${(offset = 0)}`;
  } else {
    return `LIMIT ${limit} OFFSET ${offset}`;
  }
}

module.exports = {
  filterBuilder,
  orderByBuilder,
  limitBuilder,
};
