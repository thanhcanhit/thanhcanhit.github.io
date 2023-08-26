import { Schema, model } from "mongoose";

const BoxCommentSchema = new Schema({
	name: String,
	post_id: String,
	comments: [
		{
			user_id: { type: Schema.ObjectId, ref: "User" },
			rating: Number,
			content: String,
		},
	],
});

export default model("BoxComment", BoxCommentSchema);
