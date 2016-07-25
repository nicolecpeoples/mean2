var Answer = mongoose.model('Answer')
var Question = mongoose.model('Question')
var User = mongoose.model('User')
module.exports = (function () {

  return {
    show: function(req, res) {
      console.log(req.body.id)
      Answer.find({ _question: { _id: req.body.id}}).populate('_question _user').exec(function(err, answer){
        if (err) console.log('sorry, there are no matching questions');
        res.json(answer);
        console.log(answer)
      })
    },
    create: function (req, res) {

      console.log('in answer server controller', req.body)
      var answer = new Answer(req.body)
      answer.save(function (err) {
        if (err) {
          res.json(err)
        }else {
          Question.findOne({_id: req.body._question}, function(err, question){
            question._answers.push(answer.id)
            question.save(function(err){
              if(err){
                res.json({errors: err});
              }
               
            })
          })
          User.findOne({_id:req.body._user}, function(err, user){
            user._answers.push(answer.id)
            user.save(function(err){
              if(err){
                res.json({errors: err});
              }
               
            })
          })
          res.json({status: true});
          // Question.find({_id: req.body.})
          
        }
      })
    },
    like: function(req, res){
      
    }
  }
})()
