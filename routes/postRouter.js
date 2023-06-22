const express = require('express');
const { checkLogInToken,optionalCheckLogInToken } = require('../middlewares/auth'); 
const postsController = require('../controllers/postsController');

const router = express.Router();

router.post('/community', checkLogInToken, postsController.createPost);
router.post('/community/:userId',checkLogInToken, postsController.getPostById);
router.post('/community/:userId/agree', checkLogInToken, postsController.agreePost);
router.post('/community/:postId/disagree', checkLogInToken, postsController.disagreePost);
router.get('/community/type/:post_type_id',optionalCheckLogInToken, postsController.getPosts);
router.put('/community/:postId',checkLogInToken, postsController.updatePost);
router.delete('/community/:postId',checkLogInToken, postsController.deletePost);
router.get('/community/:post_type_id', checkLogInToken, postsController.getAllPosts);

module.exports = { router };
