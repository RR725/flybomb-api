const schedule = require('node-schedule')
const stock = require('./stock')

schedule.scheduleJob('39 34 16 * * *', function () {
  stock.list()
})
