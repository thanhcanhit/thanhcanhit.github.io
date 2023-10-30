const mainRoute = require("./mainRoute.js");
const userRoute = require("./userRoute.js");
const postRoute = require("./postRoute.js");
const commentRoute = require("./commentRoute.js");
const tagRoute = require("./tagRoute.js");
const authRoute = require("./authRoute.js");
const meRoute = require("./meRoute.js");

const declareEndpoint = (app) => {
	app.use("/api/me", meRoute);
	app.use("/api/user", userRoute);
	app.use("/api/post", postRoute);
	app.use("/api/comment", commentRoute);
	app.use("/api/tag", tagRoute);
	app.use("/api/auth", authRoute);
	app.use("/api/", mainRoute);
};

module.exports = declareEndpoint;
