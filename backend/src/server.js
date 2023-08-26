import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import url from "url";
import declareEndpoint from "./routes/index.js";
import {connectDB} from "./config/db.js"

// Environment variables
dotenv.config();

// Connect db
connectDB();

// Constants
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Declare endpoints
declareEndpoint(app);

// Run the server
app.listen(port, () => {
	console.log("listening on port http://localhost:" + port);
});
