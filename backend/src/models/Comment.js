const { Schema, model } = require("mongoose");

Schema.Types.String.set("trim", true);

const commentSchema = new Schema(
	{
		post_id: {
			type: Schema.ObjectId,
			ref: "Post",
		},
		user_id: {
			type: Schema.ObjectId,
			ref: "User",
			default: null,
		},
		rating: {
			type: Number,
			default: 5,
		},
		content: {
			type: String,
		},
		displayName: {
			type: String,
			default: "Ẩn danh",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Comment", commentSchema);
