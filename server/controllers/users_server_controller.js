var User = mongoose.model('User')
module.exports = (function () {
  return {
    index: function (req, res) {
      User.find({}, function (err, users) {
        if (err) res.json({status: false, errors: err})
        res.json({status: true, users: users, session: req.session})
      })
    },
    create: function (req, res) {
      console.log('here', req.body)
      var user = new User(req.body)
      user.save(function (err) {
        if (err) res.json({status: false, errors: err})
        req.session.userInfo = {
          id: user._id,
          username: user.username
        }
        console.log('yaaaay', req.session)
        res.json({status: true, user: req.session.userInfo})
      })
    },
    logout: function (req, res) {
      req.session.destroy(function (err) {
        if (err) res.json({status: false, errors: err})
        res.json({status: true})
      })
    },
    session: function (req, res) {
      console.log(req.session.userInfo)
      res.json({status: true, user: req.session.userInfo})
    }
  }
})()
