import { encode } from "../util/index.js";
import User from "../models/User.js";

class UserController {
	// [GET] /user/:username
	async getOne(req, res, next) {
		try {
			const reqUsername = req.params.username;
			let user = await User.findOne({ username: reqUsername });

			if (!user) user = await User.findOne({ _id: reqUsername });

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
}

export default new UserController();
