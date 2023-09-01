import Post from "../models/Post.js";

class PostController {
	// [GET] /post/:id
	async getOne(req, res, next) {
		try {
			const postId = req.params.id;
			const post = await Post.findOne({ _id: postId })
				.populate("user_id")
				.exec();

			if (!post) res.json({ message: "Not found", data: {} });
			else {
				const { user_id, ...restPost } = post.toJSON();
				const { password, isAdmin, ...restUser } = user_id;
				post.view += 1;
				await post.save();
				res.json({
					message: "Completed",
					data: {
						post: restPost,
						user: restUser,
					},
				});
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

			const posts = await Post.find({}).skip(offset).limit(limit).sort({createdAt: -1});;

			res.json({ message: "Completed", data: posts });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /post/size
	async getSize(req, res, next) {
		try {
			const numPosts = await Post.count();
			res.json({ message: "Completed", data: numPosts });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /post/search?title=<string>&tags=<string[]>
	async search(req, res, next) {
		try {
			let { title, tags } = req.query;
			tags = tags.split(",");
			const titlePattern = new RegExp(`^${title}`, "i");

			const posts = await Post.find({
				tags: { $all: tags },
				title: { $regex: titlePattern },
			}).sort({createdAt: -1});

			res.json({ message: "Completed", data: { title, tags, posts } });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /user
	async create(req, res, next) {
		try {
			const reqData = req.body;

			const post = new Post({
				...reqData,
			});
			await post.save();

			res.json(post);
		} catch (err) {
			next(err);
		}
	}
}

export default new PostController();
