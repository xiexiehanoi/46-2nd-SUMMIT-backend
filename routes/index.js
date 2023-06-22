const express = require("express");

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const showRouter = require("./showRouter");
const wishRouter = require("./wishRouter");
const showPostsRouter = require("./showPostsRouter");
const reservationRouter = require("./reservationRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/shows", showRouter.router);
router.use("/wishs", wishRouter.router);
router.use("/showposts", showPostsRouter.router);
router.use("/reservations", reservationRouter.router);

module.exports = router;
