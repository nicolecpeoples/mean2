var Poll = mongoose.model('Poll')
var User = mongoose.model('User')
module.exports = (function () {


  return {
    index: function(req, res){
      Poll.find({}).populate('_user').exec( function(err, questions){
        if(err){
          console.log('no matching topics')
        }
        res.json({questions})
      })
    },
    create: function (req, res) {
      var poll = new Poll(req.body)
      poll.save(function (err) {
        if (err) {
          res.json(err)
        }else {
          User.findOne({_id: req.body._user}, function(err, user){
            console.log(poll._id);
            user._polls.push(poll._id);
            user.save(function(err){
            if (err) {
              res.json({errors: err});
            }
            else{
              res.json({success: true});
            }
          })
          })
        }
      })
    },
    delete: function(req, res, next){
      console.log(req.poll)
      poll = req.poll
      req.poll.remove(function(err){
        if (err){
          return next(err);
        }
        else {
          User.findOne({_id: poll._user}, function(err, user){
            user._polls.splice(poll._id, 1);
            user.save(function(err){
            if (err) {
              res.json({errors: err});
            }
            else{
              res.json({success: true});
            }
          })
          })
          
        }
      })
    }, 
    vote: function(req, res) {

    }, 
    read : function(req, res){
      console.log(req.poll);
      res.json(req.poll);
    },
    pollByID : function(req, res, next, id){
      Poll.findOne({_id: id}).populate('_user').exec( function(err, poll){
        if (err){
          return next(err);
        }
        else {
          req.poll = poll;
          next();
        }
      })
    }
  }
})()
