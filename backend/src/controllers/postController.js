const Post = require("../models/Post.js");
const User = require("../models/User.js");
class PostController {
	// [GET] /post/:id
	async getOne(req, res, next) {
		try {
			const postId = req.params.id;
			const post = await Post.findOne({
				_id: postId,
				deletedAt: {
					$exists: false,
				},
			})
				.populate("user_id")
				.exec();
			if (!post)
				res.json({
					message: "Not found",
					data: {},
				});
			else {
				const { user_id, ...restPost } = post.toJSON();
				post.view += 1;
				await post.save();
				if (user_id) {
					const { password, isAdmin, ...restUser } = user_id;
					res.json({
						message: "Completed",
						data: {
							post: restPost,
							user: restUser,
						},
					});
				} else {
					res.json({
						message: "Completed",
						data: {
							post: restPost,
						},
					});
				}
			}
		} catch (err) {
			next(err);
		}
	}
	// [GET] /post?limit=<number>&offset=number
	async getList(req, res, next) {
		try {
			let { limit, offset } = req.query;
			if (!limit) limit = 10;
			if (!offset) offset = 0;
			const posts = await Post.find({
				deletedAt: {
					$exists: false,
				},
			})
				.skip(offset)
				.limit(limit)
				.sort({
					createdAt: -1,
				});
			res.json({
				message: "Completed",
				data: posts,
			});
		} catch (err) {
			next(err);
		}
	}

	// [GET] /post/size
	async getSize(req, res, next) {
		try {
			const numPosts = await Post.find({
				deletedAt: {
					$exists: false,
				},
			}).count();
			res.json({
				message: "Completed",
				data: numPosts,
			});
		} catch (err) {
			next(err);
		}
	}

	// [GET] /post/search?title=<string>&tags=<string[]>
	async search(req, res, next) {
		try {
			let { title, tags } = req.query;
			tags = tags?.split(",");
			const titlePattern = title
				? new RegExp(`^${title}`, "i")
				: new RegExp("^.", "i");
			if (!tags) {
				const posts = await Post.find({
					title: {
						$regex: titlePattern,
					},
					deletedAt: {
						$exists: false,
					},
				}).sort({
					createdAt: -1,
				});
				return res.json({
					message: "Completed",
					data: posts,
				});
			} else {
				const posts = await Post.find({
					tags: {
						$all: tags,
					},
					title: {
						$regex: titlePattern,
					},
					deletedAt: {
						$exists: false,
					},
				}).sort({
					createdAt: -1,
				});
				return res.json({
					message: "Completed",
					data: posts,
				});
			}
		} catch (err) {
			next(err);
		}
	}

	// [POST] /post
	async create(req, res, next) {
		try {
			const reqData = req.body;
			const { user_id } = reqData;
			const post = new Post({
				...reqData,
			});
			await post.save();
			const userArticleCount = await Post.find({
				user_id: user_id,
				deletedAt: {
					$exists: false,
				},
			}).count();
			if (user_id) {
				await User.findOneAndUpdate(
					{
						_id: user_id,
					},
					{
						$set: {
							numPost: userArticleCount,
						},
					}
				);
			}
			res.json(post);
		} catch (err) {
			next(err);
		}
	}

	// [PATCH] /post/:postId/restore
	async restore(req, res, next) {
		try {
			const { post_id } = req.params;
			const post = await Post.findOne({
				_id: post_id,
			});
			const user_id = post.user_id;
			// Update new article count for this user
			const userArticleCount = await Post.find({
				user_id: user_id,
				deletedAt: {
					$exists: false,
				},
			}).count();
			if (user_id) {
				await User.findOneAndUpdate(
					{
						_id: user_id,
					},
					{
						$set: {
							numPost: userArticleCount,
						},
					}
				);
			}
			await Post.findByIdAndUpdate(post_id, {
				$unset: {
					deletedAt: "",
				},
			});
			res.json({
				message: "Complete",
			});
		} catch (err) {
			next(err);
		}
	}

	// [PATCH] /post/:postId
	async delete(req, res, next) {
		try {
			const { post_id } = req.params;
			const post = await Post.findOne({
				_id: post_id,
			});
			const user_id = post.user_id;
			// Update new article count for this user
			const userArticleCount = await Post.find({
				user_id: user_id,
				deletedAt: {
					$exists: false,
				},
			}).count();
			if (user_id) {
				await User.findOneAndUpdate(
					{
						_id: user_id,
					},
					{
						$set: {
							numPost: userArticleCount,
						},
					}
				);
			}
			await Post.findByIdAndUpdate(post_id, {
				$set: {
					deletedAt: new Date(),
				},
			});
			res.json({
				message: "Complete",
			});
		} catch (err) {
			next(err);
		}
	}

	// [POST] /post/:postId
	async forceDelete(req, res, next) {
		try {
			const { post_id } = req.params;
			const post = await Post.findOne({
				_id: post_id,
			});
			const user_id = post.user_id;
			// Update new article count for this user
			const userArticleCount = await Post.find({
				user_id: user_id,
				deletedAt: {
					$exists: false,
				},
			}).count();
			if (user_id) {
				await User.findOneAndUpdate(
					{
						_id: user_id,
					},
					{
						$set: {
							numPost: userArticleCount,
						},
					}
				);
			}
			await Post.findByIdAndDelete(post_id);
			res.json({
				message: "Complete",
			});
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /post/:postId
	async put(req, res, next) {
		try {
			const { post_id } = req.params;
			const updatedPost = req.body;
			await Post.findOneAndUpdate(
				{
					_id: post_id,
				},
				{
					$set: updatedPost,
				}
			);
			res.json({
				message: "Complete",
			});
		} catch (err) {
			next(err);
		}
	}
}
module.exports = new PostController();
