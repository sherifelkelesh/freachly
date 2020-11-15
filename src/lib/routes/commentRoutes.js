const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/CommentController');

router.get('/', CommentController.getComments);
router.post('/', CommentController.createComment);
router.patch('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);
router.get('/topHashtags', CommentController.getTopHashtags);
router.get('/topMentions', CommentController.getTopMentions);
router.get('/getUserComments/:userId', CommentController.getUserComments);

module.exports = router;
