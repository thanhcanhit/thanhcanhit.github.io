import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, index: 1 },
		avatar_path: { type: String, default: "" },
		username: { type: String, unique: true },
		password: String,
		bio: { type: String, default: "" },
		isAdmin: { type: Boolean, default: false },
		numPost: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export default model("User", userSchema);
