import { encode } from "../util/index.js";
import User from "../models/User.js";

class UserController {
	// [GET] /user/:username
	async getOne(req, res, next) {
		try {
			const reqUsername = req.params.username;
			const user = await User.findOne({ username: reqUsername });

			if (!user) return res.json({ message: "Not found", data: {} });
			else {
				const { isAdmin, username, password, ...rest } = user.toJSON();
				res.json({ message: "Completed", data: rest });
			}
		} catch (err) {
			next(err);
		}
	}

	// [GET] /user?limit=<number>&offset=number
	async getList(req, res, next) {
		try {
			let { limit, offset } = req.query;
			if (!limit) limit = 10;
			if (!offset) offset = 0;

			const users = await User.find({}).skip(offset).limit(limit);

			res.json({ message: "Completed", data: users });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /user/create
	async create(req, res, next) {
		try {
			const reqData = req.body;
			const hashPassword = await encode(reqData.password);

			try {
				const user = new User({
					...reqData,
					password: hashPassword,
				});
				await user.save();

				res.json(user);
			} catch (createError) {
				res.json({ message: "username already exists" });
			}
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
