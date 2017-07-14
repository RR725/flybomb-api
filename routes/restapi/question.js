const questionCounter = require('../../schema/counter').question;
const questionSchema = require('../../schema/question');

var Counter = db.model('counter_question', questionCounter);
questionSchema.pre('save', function (next) {
	var self = this;
	Counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { questionId: 1 } }, function (error, data) {
		if (error) return next(error);
		self.questionId = data.questionId;
		next();
	});



});
var Question = db.model('question', questionSchema)
exports.add = function (req, res) {
	const body = req.body;
	console.log(body)
	var name = new Question({
		subject: body.subject,
		title: body.title,
		type: body.type,
		answer: body.answer,
		point: body.point || '',
		createTime: Date.now(),
		modifyTime: Date.now(),
		content: body['content[]']
	});
	name.save(function (err) {
		if (err) {
			res.send({ code: '500', value: null, message: err.errors.title.message });
			return;
		}
		res.send({ code: '200', value: true });
	})

};
exports.update = function (req, res) {
	const body = req.body;
	var data = {
		subject: body.subject,
		title: body.title,
		type: body.type,
		point: body.point || '',
		answer: body.answer,
		modifyTime: Date.now(),
		content: body['content[]']
	};
	const questionId = body.questionId;
	Question.update({ questionId: questionId }, data, function (err) {
		if (err) {
			res.send({ code: '500', value: null, message: err.errors.title.message });
			return;
		}
		res.send({ code: '200', value: true });
	})

};

exports.listRandom = function (req, res) {
	let body = req.body;
	let json = {
		subject: body.subject,
		type: body.type,
	};
	let query = Question.find(json);
	query.count(json, function (err, count) {
		if (count === 0) {
			count = 1;
		}
		let pageNum = count * Math.random();
		pageNum = Math.ceil(pageNum);
		let pageSize = 1;
		query.skip((pageNum - 1) * pageSize);
		query.limit(pageSize);
		query.find(function (err, doc) {
			if (err) {
				res.send({ code: '500', value: null, message: err.errors.title.message });
				return;
			}
			let value = null;
			if (doc.length) {

				value = {
					questionId: doc[0].questionId,
					subject: doc[0].subject,
					title: doc[0].title,
					type: doc[0].type,
					point: doc[0].point,
					answer: doc[0].answer,
					content: doc[0].content
				};
			}
			res.send({ code: '200', value: value });
		});
	})

}
exports.list = function (req, res) {
	let body = req.body;
	let json = {};
	for (let i in body) {
		if (i === 'pageNum' || i === 'pageSize') {

		} else {
			json[i] = body[i];
		}
	}
	let query = Question.find(json);
	query.count(json, function (err, count) {
		let pageNum = parseInt(body.pageNum || 1);
		let pageSize = parseInt(body.pageSize || 10);
		query.skip((pageNum - 1) * pageSize);
		query.limit(pageSize);
		query.find(function (err, doc) {
			if (err) {
				res.send({ code: '500', value: null, message: err.errors.title.message });
				return;
			}
			let value = [];
			let total = doc.length;
			doc.map(function (data, key) {
				value.push({
					questionId: data.questionId,
					subject: data.subject,
					title: data.title,
					type: data.type,
					point: data.point,
					answer: data.answer,
					content: data.content
				});
			});
			res.send({ code: '200', value: { result: value, total: count } });
		});
	})

}
exports.findOne = function (req, res) {
	const body = req.body;
	var query = Question.where({ questionId: body.id });
	query.findOne(function (err, data) {
		if (err) {
			res.send({ code: '500', value: null, message: err.errors.title.message });
			return;
		}
		let value = null;
		if (data) {
			value = {
				questionId: data.questionId,
				subject: data.subject,
				title: data.title,
				type: data.type,
				point: data.point || '',
				answer: data.answer,
				content: data.content
			};
		};
		res.send({ code: '200', value: value });
	});
}
