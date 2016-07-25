var app = require('./server/config/config.js')
require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)
app.listen(process.env.PORT, function () {
  console.log(process.env.PORT)
})
