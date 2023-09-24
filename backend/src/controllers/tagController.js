const Tag = require("../models/Tag.js");
class PostController {
	// [GET] /tag
	async getAll(req, res, next) {
		try {
			const tags = await Tag.find({});
			res.json({
				message: "Completed",
				data: tags.map((tag) => tag.name),
			});
		} catch (err) {
			next(err);
		}
	}

	// [POST] /tag
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const tag = new Tag({
				name,
			});
			await tag.save();
			res.json({
				message: "Completed",
				data: tag,
			});
		} catch (err) {
			next(err);
		}
	}
}
module.exports = new PostController();
