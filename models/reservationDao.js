const { dataSource } = require("./dataSource");

const createReservation = async (
  userId,
  seatsId,
  point,
  quantity,
  totalPrice,
  reservationNumber
) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [getSeatInfo] = await queryRunner.query(
      `
        SELECT
          show_id,
          age,
          grade,
          price,
          theater_id,
          showtime_id,
          available_ticket
        FROM show_seats
        WHERE show_seats.id = ?
      `,
      [seatsId]
    );
    const [getUserInfo] = await queryRunner.query(
      `
       SELECT
         email,
         name,
         phone_number,
         kakao_id,
         point
        FROM users
        WHERE id = ?
       `,
      [userId]
    );
    const ticketQuantity = await dataSource.query(
      `
        SELECT
         available_ticket
        FROM show_seats
        WHERE show_seats.id = ?
      `,
      [seatsId]
    );

    const available_ticket = getSeatInfo.available_ticket;

    if (available_ticket < quantity) {
      throw new Error({ message: "AVAILABLE_TICKET_IS_NOT_ENOUGH" });
    }
    const updateAvailableTicket = await queryRunner.query(
      `
        UPDATE show_seats
          SET available_ticket = ? - ?
        WHERE show_seats.id = ?
      `,
      [available_ticket, quantity, seatsId]
    );
    const userPoint = getUserInfo.point;
    if (userPoint < 0) {
      throw new Error({ message: "USER_POINT_IS_NOT_ENOUGH" });
    }

    const amountBePaid = totalPrice - point;

    const updateUserPoint = await queryRunner.query(
      `
      UPDATE users
      SET point = point - ?
      WHERE users.id =?
      `,
      [point, userId]
    );

    const showId = getSeatInfo.show_id;
    const reservationsStatusId = 1;

    const createReservation = await queryRunner.query(
      `
        INSERT INTO reservations
        (
          show_id,
          user_id,
          show_seats_id,
          reservation_number,
          reservation_status_id
          )
          VALUES(?,?,?,?,?)
          `,
      [showId, userId, seatsId, reservationNumber, reservationsStatusId]
    );

    const reservationId = createReservation.insertId;
    const createReservationItems = queryRunner.query(
      `
        INSERT INTO reservation_items
        (
          reservation_id,
          quantity,
          total_price
        ) VALUES(?,?,?)
        `,
      [reservationId, quantity, amountBePaid]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createReservation,
};
