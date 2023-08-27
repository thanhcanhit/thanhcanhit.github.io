import { Schema, model } from "mongoose";

Schema.Types.String.set("trim", true);

const commentSchema = new Schema(
	{
		post_id: { type: Schema.ObjectId, ref: "Post" },
		user_id: { type: Schema.ObjectId, ref: "User" },
		rating: { type: Number, default: 5 },
		content: { type: String },
	},
	{ timestamps: true }
);

export default model("Comment", commentSchema);
