import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
	encode,
	compare,
	createAccessToken,
	createRefreshToken,
} from "../util/index.js";

class AuthController {
	// [POST] /auth/login
	async login(req, res, next) {
		try {
			const { username, password } = req.body;

			const user = await User.findOne({ username: username });

			if (!user)
				return res.status(401).json({
					message: "Username is not exists",
					data: {},
				});

			const isCorrectPassword = await compare(password, user.password);

			res.set("Access-Control-Allow-Credentials", true);

			if (!isCorrectPassword) {
				return res.status(401).json({ message: "Password is not correct" });
			} else {
				const { password, ...payload } = user.toJSON();
				const accessToken = createAccessToken(payload);
				const refreshToken = createRefreshToken(payload);

				res.cookie("REFRESH_TOKEN", refreshToken, {
					expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
					sameSite: "none",
					httpOnly: true,
					secure: true,
				});

				res.json({
					message: "Completed",
					data: { ...payload, accessToken: accessToken },
				});
			}
		} catch (err) {
			next(err);
		}
	}

	// [GET] /auth/refreshToken
	async refresh(req, res, next) {
		try {
			const refreshToken = req.cookies?.REFRESH_TOKEN;
			if (!refreshToken) return res.sendStatus(401);

			const decode = jwt.verify(refreshToken, process.env.REFRESH_KEY);
			if (!decode) return res.sendStatus(403);

			// Generate new token
			const { iat, exp, ...payload } = decode;
			const newAccessToken = createAccessToken({ ...payload });
			const newRefreshToken = createRefreshToken({ ...payload });

			res.set("Access-Control-Allow-Credentials", true);

			res.cookie("REFRESH_TOKEN", newRefreshToken, {
				expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
				sameSite: "none",
				httpOnly: true,
				secure: true,
			});

			return res.json({
				message: "Completed",
				data: { ...payload, accessToken: newAccessToken },
			});
		} catch (err) {
			next(err);
		}
	}

	// [POST] /auth/register
	async register(req, res, next) {
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
				res.json({ error: "username already exists" });
			}
		} catch (err) {
			next(err);
		}
	}

	// [POST] /auth/logout
	async logout(req, res, next) {
		res.clearCookie("REFRESH_TOKEN");
		res.json({ message: "Logout completed" });
	}
}

export default new AuthController();
