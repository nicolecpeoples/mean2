var users = require('../controllers/users_server_controller.js')
var polls = require('../controllers/polls_server_controller.js')

module.exports = function (app) {
//users controller
 app.route('/users')
  .get(users.session)
  .post(users.create);

  app.get('/logout', users.logout);

//polls controller
 app.route('/polls/:pollID')
   .get(polls.read)
   .put(polls.vote)
   .delete(polls.delete);
  app.param('pollID', polls.pollByID);

 app.route('/polls')
  .get(polls.index)
  .post(polls.create);



}
