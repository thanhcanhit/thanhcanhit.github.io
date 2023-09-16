import { Schema, model } from "mongoose";

Schema.Types.String.set("trim", true);

const postSchema = new Schema(
	{
		title: { type: String, index: 1 },
		shortDesc: { type: String, max: 255, default: "" },
		img_path: { type: String, default: "" },
		procLink: { type: String, default: "" },
		sourceLink: { type: String, default: "" },
		content: { type: String, default: "" },
		tags: { type: [String], default: [] },
		user_id: { type: Schema.ObjectId, ref: "User" },
		rating: { type: Number, default: 0 },
		view: { type: Number, default: 0 },
		deletedAt: {type: Date},
	},
	{ timestamps: true }
);

export default model("Post", postSchema);
