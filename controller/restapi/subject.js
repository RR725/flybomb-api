const subjectCounter = require('../../schema/counter').subject
const subjectSchema = require('../../schema/subject')

var Counter = db.model('counter_subject', subjectCounter)
subjectSchema.pre('save', function(next) {
  var self = this
  Counter.findByIdAndUpdate(
    { _id: 'entityId' },
    { $inc: { subjectId: 1 } },
    function(error, data) {
      if (error) return next(error)
      self.subjectId = data.subjectId
      next()
    }
  )
})
var Subject = db.model('subject', subjectSchema)

exports.add = function(req, res) {
  const body = req.body

  var name = new Subject({
    name: body.name
  })
  name.save(function(err) {
    if (err) {
      console.log(err)
      return
    }
    res.send({ code: '200', value: true })
  })
}
exports.list = function(req, res) {
  Subject.find().find(function(err, doc) {
    if (err) {
      console.log(err)
      return
    }
    let value = []
    doc.map(function(data, key) {
      value.push({
        name: data.name,
        subjectId: data.subjectId
      })
    })
    res.send({ code: '200', value: value })
  })
}
