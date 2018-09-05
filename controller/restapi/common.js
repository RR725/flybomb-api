module.exports = function(req, res,next) {
  let sess = req.session
  let userName = sess.uid

  const body = req.body
  let operateCount = sess.operateCount || 0
  const now = Date.now()
  let lastOperateTime = sess.lastOperateTime || 0
  if(operateCount % 50 === 0){
    req.session.lastOperateTime = now
  }
  req.session.operateCount = operateCount + 1
  if (operateCount > 50 && now - lastOperateTime < 300 * 1000) {
    res.send({
      code: '500',
      value: null,
      message: '操作太频繁'
    })
    return
  }
  // if(1){
  //   res.send({code:3});
  //   return;
  // }
  next();
}
