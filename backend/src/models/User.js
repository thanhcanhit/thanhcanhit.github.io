import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: String,
		avatar_path: String,
		username: String,
		password: String,
		bio: String,
		isAdmin: Boolean,
		numPost: Number,
	},
	{ timestamps: true }
);

export default model("User", userSchema);
