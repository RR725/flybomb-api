
let titleValidate = [function (value, options) {
	console.log(value);
	console.log(options);
	return true;
}, 'errorllll']
module.exports = new db.Schema({
	type: { type: Number },
	title: { type: String, validate: titleValidate },
	content: { type: Array },
	createTime: { type: Date },
	modifyTime: { type: Date },
	answer: { type: String },
	questionId: { type: Number, default: 0 },
	subject: { type: String, required: true }
});
