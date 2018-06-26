const subject = require('../controller/restapi/subject')
const question = require('../controller/restapi/question')
const login = require('../controller/restapi/login')
const common = require('../controller/restapi/common')

module.exports = function(app) {
  app.post('/restapi/flybomb/subject/add',  common,subject.add)
  app.post('/restapi/flybomb/subject/list', common, subject.list)
  app.post('/restapi/flybomb/question/add',  common,question.add)
  app.post('/restapi/flybomb/question/update', common, question.update)
  app.post('/restapi/flybomb/question/list', common, question.list)
  app.post('/restapi/flybomb/question/list/random',  common,question.listRandom)

  app.post('/restapi/flybomb/question/find/one', common, question.findOne)
  app.post('/restapi/flybomb/question/recommend', common, question.findTags)
  app.post('/restapi/flybomb/login', common, login.login)
  app.post('/restapi/flybomb/logout', common, login.logout)
  app.post('/restapi/flybomb/checkLogin', common, login.checkLogin)
}
