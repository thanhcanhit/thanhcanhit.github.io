const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function encode(string) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(string, salt);
	return hash;
}
async function compare(password, hashPassword) {
	const match = await bcrypt.compare(password, hashPassword);
	return match;
}
function createAccessToken(payload) {
	return jwt.sign(payload, process.env.PRIVATE_KEY, {
		expiresIn: "60s",
	});
}
function createRefreshToken(payload) {
	return jwt.sign(payload, process.env.REFRESH_KEY, {
		expiresIn: "30d",
	});
}
exports.encode = encode;
exports.compare = compare;
exports.createAccessToken = createAccessToken;
exports.createRefreshToken = createRefreshToken;
