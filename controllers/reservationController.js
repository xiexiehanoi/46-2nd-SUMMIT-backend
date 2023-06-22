const reservationService = require("../services/reservationService");
const notificationService = require("../services/notificationService");
const path = require("path");
const fs = require("fs");
const { catchAsync } = require("../middlewares/error");

const createReservation = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { seatsId, point, quantity, totalPrice } = req.body;
  await reservationService.createReservation(
    userId,
    seatsId,
    point,
    quantity,
    totalPrice
  );

  const filePath = path.join("./static/email.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const emailData = {
        to: "mr.jang@korean.com",
        from: "sender@example.com",
        subject: "예매내역확인서",
        html: data,
      };
      notificationService.sendEmail(emailData);
    }
  });

  return res.status(200).json({ message: "RESERVATION_CREATED" });
});

module.exports = {
  createReservation,
};
