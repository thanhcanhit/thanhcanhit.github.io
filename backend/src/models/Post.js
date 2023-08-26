import { Schema, model } from "mongoose";

const postSchema = new Schema(
	{
		title: String,
		procLink: String,
		sourceLink: String,
		content: String,
		tags: [String],
		user_id: { type: Schema.ObjectId, ref: "User" },
    rating: Number,
    view: NumberF
	},
	{ timestamps: true }
);

export default model("Post", postSchema);
