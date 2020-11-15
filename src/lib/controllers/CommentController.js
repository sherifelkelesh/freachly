const Comment = require('../model/Comment');

class CommentController {
	static createComment(req, res) {
		const { id, userId, text } = req.body;
		if (!id || typeof id !== 'string') {
			return res.status(422).send({ message: 'id must be provided in a string format!' });
		}
		if (!userId || typeof userId !== 'string') {
			return res.status(422).send({ message: 'userId must be provided in a string format!' });
		}
		if (!text || typeof text !== 'string') {
			return res.status(422).send({ message: 'text must be provided in a string format!' });
		}
		const comment = req.body;
		return new Comment(comment).save()
			.then((comment) => {
				return res.json({ comment });
			})
			.catch((err) => {
				return res.status(500).send({ err });
			})
	}

	static getComments(req, res) {
		return Comment.find({})
			.then(comments => {
				return res.json({ comments });
			})
			.catch(err => {
				return res.status(500).send({ err });
			})
	}

	static getUserComments(req, res) {
		const { userId } = req.params;
		if (!userId) {
			return res.status(422).send({ message: 'userId must be provided!' });
		}
		return Comment.find({ userId })
			.then((comments) => {
				return res.json({ comments });
			})
			.catch((err) => {
				return res.status(500).send({ err });
			})
	}
	static updateComment(req, res) {
		const { commentId } = req.params;
		const { text } = req.body;
		if (!commentId) {
			return res.status(422).send({ message: 'commentId must be provided!' });
		}
		if (text && typeof text !== 'string') {
			return res.status(422).send({ message: 'text must be provided in a string format!' });
		}
		delete req.body.id;
		return Comment.findOneAndUpdate({ id: commentId }, req.body, { new: true })
			.then((comment) => {
				if (!comment) {
					return res.status(404).send({ message: 'Comment not found!' });
				}
				return res.json({ comment });
			})
			.catch((err) => {
				return res.status(500).send({ err });
			})
	}
	static deleteComment(req, res) {
		const { commentId } = req.params;
		if (!commentId) {
			return res.status(422).send({ message: 'commentId must be provided!' });
		}
		return Comment.findOneAndDelete({ id: commentId })
			.then((comment) => {
				if (!comment) {
					return res.status(404).send({ message: 'Comment not found!' });
				}
				return res.json({ comment, message: 'Comment deleted successfully' });
			})
			.catch((err) => {
				return res.status(500).send({ err });
			})
	}

	static getTopHashtags(req, res) {
		return Comment.aggregate([
			{ $project: { hashTags: '$hashTags' } },
			{ $unwind: '$hashTags' },
			{ $group: { _id: '$hashTags', count: { '$sum': 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 10 },
			{
				$project: {
					_id: 0,
					hashTag: '$_id',
					count: 1,
					sum: 1
				}
			}
		]).then((comments) => {
			return res.json(comments);
		})
			.catch((err) => {
				return res.status(500).send({ err });
			});
	}

	static getTopMentions(req, res) {
		return Comment.aggregate([
			{ $project: { mentions: '$mentions' } },
			{ $unwind: '$mentions' },
			{ $group: { _id: '$mentions', count: { '$sum': 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 10 },
			{
				$project: {
					_id: 0,
					mention: '$_id',
					count: 1,
					sum: 1
				}
			}
		]).then((comments) => {
			return res.json(comments);
		})
			.catch((err) => {
				return res.status(500).send({ err });
			});
	}
}

module.exports = CommentController;
