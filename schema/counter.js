exports.subject = new db.Schema({
    _id: { type: String, required: true },
    subjectId: { type: Number, default: 0 }
});
exports.question = new db.Schema({
    _id: { type: String, required: true },
    questionId: { type: Number, default: 0 }
});
exports.users = new db.Schema({
    _id: { type: String, required: true },
    uid: { type: Number, default: 0 }
});
