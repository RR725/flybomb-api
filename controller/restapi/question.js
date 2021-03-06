const questionCounter = require('../../schema/counter').question;
const questionSchema = require('../../schema/question');

//questionId累加
var Counter = db.model('counter_question', questionCounter);
questionSchema.pre('save', function(next) {
    var self = this;
    Counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { questionId: 1 } }, function(
        error,
        data
    ) {
        if (error) return next(error);
        self.questionId = data.questionId;
        next();
    });
});
var Question = db.model('question', questionSchema);
//新建
exports.add = function(req, res) {
    const body = req.body;
    var name = new Question({
        subject: body.subject,
        subjectId: body.subjectId,
        title: body.title,
        type: body.type,
        answer: body.answer,
        tags: body.tags,
        point: body.point || '',
        createTime: Date.now(),
        modifyTime: Date.now(),
        content: body['content']
    });

    var query = Question.where({ title: body.title });
    query.findOne(function(err, data) {
        if (err) {
            res.send({ code: '500', value: null, message: err.errors.title.message });
            return;
        }
        if (data) {
            res.send({ code: '500', value: null, message: '已经存在相同的题目' });
            return;
        } else {
            name.save(function(err) {
                if (err) {
                    console.log(err);
                    res.send({ code: '500', value: null, message: err.errors.title.message });
                    return;
                }
                res.send({ code: '200', value: true });
            });
        }
    });
};
//修改
exports.update = function(req, res) {
    const body = req.body;
    console.log(body);
    var data = {
        subject: body.subject,
        title: body.title,
        type: body.type,
        tags: body.tags,
        point: body.point || '',
        answer: body.answer,
        modifyTime: Date.now(),
        content: body['content']
    };
    const questionId = body.questionId;
    Question.update({ questionId: questionId }, data, function(err) {
        if (err) {
            res.send({ code: '500', value: null, message: err.errors.title.message });
            return;
        }
        res.send({ code: '200', value: true });
    });
};
//随机拿一条
exports.listRandom = function(req, res) {
    let body = req.body;
    let json = {
        subjectId: body.subject,
        type: body.type
    };
    let query = Question.find(json);
    query.count(json, function(err, count) {
        if (count === 0) {
            count = 1;
        }
        let pageNum = count * Math.random();
        pageNum = Math.ceil(pageNum);
        let pageSize = 1;
        query.skip((pageNum - 1) * pageSize);
        query.limit(pageSize);
        query.find(function(err, doc) {
            if (err) {
                res.send({ code: '500', value: null, message: err.errors.title.message });
                return;
            }
            let value = null;
            if (doc.length) {
                value = {
                    questionId: doc[0].questionId,
                    subject: doc[0].subject,
                    subjectId: doc[0].subjectId,
                    title: doc[0].title,
                    type: doc[0].type,
                    tags: doc[0].tags,
                    point: doc[0].point,
                    answer: doc[0].answer,
                    content: doc[0].content
                };
            }
            res.send({ code: '200', value: value });
        });
    });
};
//拿列表
exports.list = function(req, res) {
    let body = req.body;
    let json = {};
    for (let i in body) {
        if (i === 'pageNum' || i === 'pageSize') {
        } else {
            json[i] = body[i];
        }
    }
    let query = Question.find(json).sort({ modifyTime: 'desc' });
    query.count(json, function(err, count) {
        let pageNum = parseInt(body.pageNum || 1);
        let pageSize = parseInt(body.pageSize || 10);
        query.skip((pageNum - 1) * pageSize);
        query.limit(pageSize);
        query.find(function(err, doc) {
            if (err) {
                res.send({ code: '500', value: null, message: err.errors.title.message });
                return;
            }
            let value = [];
            let total = doc.length;
            doc.map(function(data, key) {
                value.push({
                    questionId: data.questionId,
                    subject: data.subject,
                    subjectId: data.subjectId,
                    title: data.title,
                    type: data.type,
                    point: data.point,
                    tags: data.tags,
                    answer: data.answer,
                    content: data.content
                });
            });
            res.send({ code: '200', value: { result: value, total: count } });
        });
    });
};
//拿某一条
exports.findOne = function(req, res) {
    const body = req.body;
    var query = Question.where(body);
    query.findOne(function(err, data) {
        if (err) {
            res.send({ code: '500', value: null, message: err.errors.title.message });
            return;
        }
        let value = null;
        if (data) {
            value = {
                questionId: data.questionId,
                subject: data.subject,
                subjectId: data.subjectId,
                title: data.title,
                type: data.type,
                point: data.point || '',
                tags: data.tags,
                answer: data.answer,
                content: data.content
            };
        }
        res.send({ code: '200', value: value });
    });
};
//根据tag拿推荐列表
exports.findTags = function(req, res) {
    const body = req.body;
    var query = Question.find({
        questionId: { $ne: body.questionId },
        subject: body.subject,
        tags: { $in: body.tags }
    });
    query.find(function(err, doc) {
        if (err) {
            console.log(err);
            res.send({ code: '500', value: null, message: err.errors.title.message });
            return;
        }

        let value = [];
        doc.map(function(data, key) {
            value.push({
                questionId: data.questionId,
                subject: data.subject,
                subjectId: data.subjectId,
                title: data.title,
                type: data.type,
                point: data.point,
                tags: data.tags,
                answer: data.answer,
                content: data.content
            });
        });
        let result = [];
        let total = value.length;
        let size = 5;
        let keys = [];

        if (total > size) {
            for (let i = 0; i < size; i++) {
                let rdm = Math.floor(value.length * Math.random());
                result.push(value[rdm]);
                value.splice(rdm, 1);
            }
        } else {
            result = value;
        }
        res.send({ code: '200', value: result });
    });
};
