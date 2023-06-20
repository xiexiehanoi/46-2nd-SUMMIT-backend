const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const showRouter = require("./showRouter");

router.use("/users", userRouter.router);
router.use("/shows", showRouter.router);

module.exports = router;
