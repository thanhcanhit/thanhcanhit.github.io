const { Schema, model } = require("mongoose");
const BoxCommentSchema = new Schema({
	name: {
		type: String,
		unique: true,
		index: 1,
	},
});
module.exports = model("Tag", BoxCommentSchema);
