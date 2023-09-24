const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Connected to database: " + process.env.DATABASE_URL);
	} catch (err) {
		console.log("Error connecting to database " + err.message);
	}
};
exports.connectDB = connectDB;
