import { Schema, model } from "mongoose";

const BoxCommentSchema = new Schema({
	name: { type: String, unique: true, index: 1 },
});

export default model("Tag", BoxCommentSchema);
