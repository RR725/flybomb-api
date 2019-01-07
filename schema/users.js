module.exports = new db.Schema({
    uid: { type: Number, default: 0 },
    name: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String },
    sex: { type: String },
    birthday: { type: String },
    remark: { type: String },
    about: { type: String }
});
