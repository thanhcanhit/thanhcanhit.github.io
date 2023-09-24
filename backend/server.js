const express = require("express"); // import morgan from "morgan";
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const url = require("url");
const declareEndpoint = require("./src/routes/index.js");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/db.js"); // Environment variables
dotenv.config();

// Connect db
connectDB();

// Constants
const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: [
			"http://127.0.0.1:5173",
			"http://thanhcanhit.id.vn",
			"http://thanhcanhit.github.io",
		],
	})
);
// app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

// Declare endpoints
declareEndpoint(app);

// Run the server
app.listen(port, () => {
	console.log("Server is running on port " + port);
});
