var users = require('../controllers/users_server_controller.js')
var questions = require('../controllers/questions_server_controller.js')
var answers  = require('../controllers/answers_server_controller.js')

module.exports = function (app) {
//users controller
 app.route('/users')
  .get(users.session)
  .post(users.create);

  app.get('/logout', users.logout);

//questions controller
 app.route('/questions/:questionID')
   .get(questions.read);
  app.param('questionID', questions.questionByID);

  app.get('/questions', questions.index),
  app.post('/questions', questions.create),


//answers controller
  app.get('/answers/:id', answers.show),
  app.post('/answers', answers.create)
  

}
