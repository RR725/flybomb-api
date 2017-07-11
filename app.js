
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1/flybomb';

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
	useMongoClient: true
});
global.db = mongoose;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');

var routes = require('./routes/index');
// var users = require('./routes/users');
var subject = require('./routes/restapi/subject');
var question = require('./routes/restapi/question');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(session({
// 	secret: 'KDJFJ_Kfjk212312ffdgggFWERW-ER3242G3G3', // 建议使用 128 个字符的随机字符串
// 	cookie: { maxAge: 60 * 1000 },
// 	name:'_flybomb_session'
// }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
app.post('/restapi/flybomb/subject/add', subject.add);
app.post('/restapi/flybomb/subject/list', subject.list);
app.post('/restapi/flybomb/question/add', question.add);
app.post('/restapi/flybomb/question/list', question.list);
app.post('/restapi/flybomb/question/find/one', question.findOne);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
