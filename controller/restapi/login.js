const UserSchema = require('../../schema/users');

let User = db.model('user', UserSchema);
exports.checkLogin = (req, res) => {
    let sess = req.session;
    let userName = sess.uid;
    let isLogined = !!userName;
    res.send({
        code: '200',
        value: {
            isLogined: isLogined,
            name: userName || ''
        }
    });
};
exports.login = function(req, res) {
    const body = req.body;

    // let query = User.where({ name: body.name });
    User.findOne({ name: body.name }, (err, result) => {
        if (err) {
            res.send({
                code: '500',
                value: null,
                message: err.errors.title.message
            });
            return;
        }
        if (!result) {
            res.send({
                code: '500',
                message: '用户名不存在',
                value: true
            });
            return;
        }
        if (result.name === body.name && body.password === result.password) {
            req.session.uid = body.name;
            res.send({
                code: '200',
                message: '登录成功',
                value: true
            });
        } else {
            res.send({
                code: '500',
                message: '登录失败',
                value: false
            });
        }
    });
};
exports.logout = function(req, res) {
    req.session.uid = null;
    res.send({
        code: '200',
        message: '成功退出'
    });
};
