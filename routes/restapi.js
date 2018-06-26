const subject = require("../controller/restapi/subject");
const question = require("../controller/restapi/question");
const login = require("../controller/restapi/login");
const common = require("../controller/restapi/common");

module.exports = function(app) {
	app.post("/restapi/flybomb/subject/add", subject.add);
	app.post("/restapi/flybomb/subject/list", subject.list);
	app.post("/restapi/flybomb/question/add", question.add);
	app.post("/restapi/flybomb/question/update", question.update);
	app.post("/restapi/flybomb/question/list", question.list);
	app.post("/restapi/flybomb/question/list/random", question.listRandom);

	app.post("/restapi/flybomb/question/find/one", question.findOne);
	app.post("/restapi/flybomb/question/recommend", question.findTags);
	app.post("/restapi/flybomb/login", login.login);
	app.post("/restapi/flybomb/logout", login.logout);
	app.post("/restapi/flybomb/checkLogin", login.checkLogin);
	
};
