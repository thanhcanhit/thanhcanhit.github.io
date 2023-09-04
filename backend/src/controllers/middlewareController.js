import jwt from "jsonwebtoken";

const middlewareController = {
	verify: async (req, res, next) => {
		try {
			const author = req.headers?.authorization;
			if (!author) return res.sendStatus(401);

			// Check token is valid
			try {
				const token = author.split(" ")[1];
				const decode = jwt.verify(token, process.env.PRIVATE_KEY);
				if (!decode)
					return res.status(401).json({ message: "Invalid token" });
        req.decodeData = decode;
				next();
			} catch (invalidTokenErr) {
				res.status(403).json({ message: "Invalid token" });
			}
		} catch (err) {
			next(err);
		}
	},
	verifyAndAdmin: (req, res, next) => {
		this.verify(req, res, () => {
			if (!req.decodeData.admin) {
				return res.sendStatus(403);
			}
			next();
		});
	},
};

export default middlewareController;
