import jwt from "jsonwebtoken";

const middlewareController = {
	verifyToken: async (req, res, next) => {
		try {
			const author = req.headers?.authorization;
			if (!author) return res.sendStatus(401);

			// Check token is valid
			try {
				const token = author.split(" ")[1];
				const decode = jwt.verify(token, process.env.PRIVATE_KEY);
				if (!decode) return res.status(401).json({ err: "Invalid token" });
				req.decodeData = decode;
				next();
				console.log("passed");
			} catch (invalidTokenErr) {
				res.status(403).json({ err: "Invalid token" });
			}
		} catch (err) {
			next(err);
		}
	},
	verifyAndAdmin: (req, res, next) => {
		middlewareController.verifyToken(req, res, () => {
			if (!req.decodeData.isAdmin) {
				return res.status(403).json({ err: "Not admin" });
			}
			next();
		});
	},
};

export default middlewareController;