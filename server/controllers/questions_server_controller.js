var Question = mongoose.model('Question')
var Answer = mongoose.model('Answer')
var User = mongoose.model('User')
module.exports = (function () {


  return {
    index: function(req, res){
      Question.find({}).populate('_answers').exec(function(err, questions){
        if(err){
          console.log('no matching topics')
        }
        res.json({questions})
      })
    },
    create: function (req, res) {
      console.log('in question create', req.body)

      var question = new Question(req.body)
      question.save(function (err) {
        if (err) {
          res.json(err)
        }else {
          console.log(req.body._user)
          User.findOne({_id: req.body._user}, function(err, user){
            console.log(question._id);
            user._questions.push(question._id);
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
    read : function(req, res){
      console.log(req.user);
      res.json(req.user);
    },
    questionByID : function(req, res, next, id){
      Question.findOne({_id: id}).populate('_answers').exec( function(err, user){
        if (err){
          return next(err);
        }
        else {
          req.user = user;
          next();
        }
      })
    }
  }
})()
