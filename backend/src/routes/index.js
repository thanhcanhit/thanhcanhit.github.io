import mainRoute from "./mainRoute.js";

const declareEndpoint = (app) => {
	app.use(mainRoute);
};

export default declareEndpoint;
