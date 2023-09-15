import mainRoute from "./mainRoute.js";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";
import commentRoute from "./commentRoute.js";
import tagRoute from "./tagRoute.js";
import authRoute from "./authRoute.js";
import meRoute from "./meRoute.js";

const declareEndpoint = (app) => {
	app.use("/me", meRoute);
	app.use("/user", userRoute);
	app.use("/post", postRoute);
	app.use("/comment", commentRoute);
	app.use("/tag", tagRoute);
	app.use("/auth", authRoute);
	app.use("/", mainRoute);
};

export default declareEndpoint;
