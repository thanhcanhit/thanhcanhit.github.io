import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

class CommentController {
	// [GET] /comment/:id
	async getOne(req, res, next) {
		try {
			const id = req.params.id;
			const comment = await Comment.findOne({ _id: id });

			if (!comment) res.json({ message: "Not found", data: {} });
			else {
				res.json({
					message: "Completed",
					data: { comment },
				});
			}
		} catch (err) {
			next(err);
		}
	}

	// [GET] /comment/post/:postId?limit=<number>&offset=number
	async getCommentOfPost(req, res, next) {
		try {
			const postId = req.params.postId;
			let { limit, offset } = req.query;
			if (!limit) limit = 10;
			if (!offset) offset = 0;

			const comments = await Comment.find({ post_id: postId })
				.skip(offset)
				.limit(limit);

			res.json({ message: "Completed", data: comments });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /comment
	async create(req, res, next) {
		try {
			// Tạo mới comment
			const reqData = req.body;
			const newComment = new Comment({
				...reqData,
			});
			await newComment.save();

			// Cập nhật rating
			try {
				// Lấy danh sách các comment liên quan đến post
				const comments = await Comment.find({
					post_id: newComment.post_id,
				});

				// Tính trung bình rating của các comment
				const totalRating = comments.reduce(
					(sum, comment) => sum + comment.rating,
					0
				);
				const averageRating = totalRating / comments.length;

				// Cập nhật rating của post với giá trị trung bình
				const result = await Post.updateOne(
					{ _id: newComment.post_id },
					{ $set: { rating: averageRating } }
				);

				console.log("Post rating updated:", result.rating);
				res.json(newComment);
			} catch (error) {
				res.json({ Error: "Some thing not correct" });
			}
		} catch (err) {
			next(err);
		}
	}
}

export default new CommentController();
