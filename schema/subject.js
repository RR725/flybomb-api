module.exports = new db.Schema({
    subjectId: { type: Number, default: 0 },
    name: { type: String, required: true }
});
