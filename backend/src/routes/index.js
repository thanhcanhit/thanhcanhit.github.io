const mainRoute = require("./mainRoute.js");
const userRoute = require("./userRoute.js");
const postRoute = require("./postRoute.js");
const commentRoute = require("./commentRoute.js");
const tagRoute = require("./tagRoute.js");
const authRoute = require("./authRoute.js");
const meRoute = require("./meRoute.js");
const declareEndpoint = (app) => {
	app.use("/me", meRoute);
	app.use("/user", userRoute);
	app.use("/post", postRoute);
	app.use("/comment", commentRoute);
	app.use("/tag", tagRoute);
	app.use("/auth", authRoute);
	app.use("/", mainRoute);
};
module.exports = declareEndpoint;
