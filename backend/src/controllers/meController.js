import Post from "../models/Post.js";
import User from "../models/User.js";

class MeController {
	// [GET] /me/posts
	async getList(req, res, next) {
		try {
			let { user_id } = req.query;

			const posts = await Post.find({
				user_id: user_id,
				deletedAt: { $exists: false },
			}).sort({
				createdAt: -1,
			});

			res.json({ message: "Completed", data: posts });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /me/posts/size
	async getListSize(req, res, next) {
		try {
			let { user_id } = req.query;

			const size = await Post.count({
				user_id: user_id,
				deletedAt: { $exists: false },
			});

			res.json({ message: "Completed", data: size });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /me/posts/deleted
	async getListDeleted(req, res, next) {
		try {
			let { user_id } = req.query;

			const posts = await Post.find({
				user_id: user_id,
				deletedAt: { $exists: true },
			}).sort({
				createdAt: -1,
			});

			res.json({ message: "Completed", data: posts });
		} catch (err) {
			next(err);
		}
	}
	// [GET] /me/posts/deleted/size
	async getListDeletedSize(req, res, next) {
		try {
			let { user_id } = req.query;

			const size = await Post.count({
				user_id: user_id,
				deletedAt: { $exists: true },
			});

			res.json({ message: "Completed", data: size });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /posts/size
	async getSize(req, res, next) {
		try {
			let { user_id } = req.query;
			const numPosts = await Post.find({
				user_id,
				deletedAt: { $exists: false },
			}).count();
			res.json({ message: "Completed", data: numPosts });
		} catch (err) {
			next(err);
		}
	}

	// [GET] /posts/search?title=<string>&tags=<string[]>
	async search(req, res, next) {
		try {
			let { title, tags, user_id } = req.query;
			tags = tags?.split(",");

			const titlePattern = title
				? new RegExp(`^${title}`, "i")
				: new RegExp("^.", "i");

			if (!tags) {
				const posts = await Post.find({
					user_id: user_id,
					title: { $regex: titlePattern },
					deletedAt: { $exists: false },
				}).sort({ createdAt: -1 });
				return res.json({ message: "Completed", data: posts });
			} else {
				const posts = await Post.find({
					tags: { $all: tags },
					title: { $regex: titlePattern },
				}).sort({ createdAt: -1 });

				return res.json({ message: "Completed", data: posts });
			}
		} catch (err) {
			next(err);
		}
	}
}

export default new MeController();
