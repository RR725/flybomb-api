
module.exports = function(req,res,callback) {
	const body = req.body;
	let loginCount = req.session.loginCount || 0;
	let lastLoginTime = req.session.lastLoginTime || 0;
	const now = Date.now();
	req.session.lastLoginTime = now;
	req.session.loginCount = loginCount + 1;
	if (loginCount > 8 && now - lastLoginTime < 300 * 1000) {
		res.send({
			code: "500",
			value: null,
			message: "操作太频繁"
		});
		return;
	}
	callback(req,res);

};
