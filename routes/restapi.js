const subject = require('../controller/restapi/subject')
const question = require('../controller/restapi/question')
const login = require('../controller/restapi/login')
const stock = require('../controller/restapi/stock')
const common = require('../controller/restapi/common')

module.exports = function (app) {
  app.post('/restapi/flybomb/subject/add', common, subject.add) //增加科目
  app.post('/restapi/flybomb/subject/list', common, subject.list) //科目列表
  app.post('/restapi/flybomb/question/add', common, question.add) //增加题目
  app.post('/restapi/flybomb/question/update', common, question.update) //修改题目
  app.post('/restapi/flybomb/question/list', common, question.list) //题目列表
  app.post('/restapi/flybomb/question/list/random', common, question.listRandom) //随机获取一个题

  app.post('/restapi/flybomb/question/find/one', common, question.findOne) //查找某一个题的信息
  app.post('/restapi/flybomb/question/recommend', common, question.findTags) //推荐列表
  app.post('/restapi/flybomb/login', common, login.login) //登录
  app.post('/restapi/flybomb/logout', common, login.logout) //登出
  app.post('/restapi/flybomb/checkLogin', common, login.checkLogin) //判断是否登录

  app.post('/restapi/flybomb/stock/list', common, stock.list) //股票列表
}
