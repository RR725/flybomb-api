var subject = require("../controller/restapi/subject");
var question = require("../controller/restapi/question");

module.exports = function(app) {
	app.post("/restapi/flybomb/subject/add", subject.add);
	app.post("/restapi/flybomb/subject/list", subject.list);
	app.post("/restapi/flybomb/question/add", question.add);
	app.post("/restapi/flybomb/question/update", question.update);
	app.post("/restapi/flybomb/question/list", question.list);
	app.post("/restapi/flybomb/question/list/random", question.listRandom);

	app.post("/restapi/flybomb/question/find/one", question.findOne);
	app.post("/restapi/flybomb/question/recommend", question.findTags);
};
