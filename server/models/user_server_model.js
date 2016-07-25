var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UsersSchema = new mongoose.Schema({
  username: {type: String, required: true, minlength: 3, maxlength: 256, unique: true, trim: true},

  _questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],

  _answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  
}, {timestamps: true})


var QuestionsSchema = new mongoose.Schema({
 question: { type: String, required: true, minlength: 10}, 
 description: { type: String},
 _user: { type: Schema.Types.ObjectId, ref: 'User'},
 _answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, { timestamps: true });



var AnswersSchema = new mongoose.Schema({
 answer: { type: String, required: true, minlength: 10},
 details: { type: String},
 likes: {type: Number, default: 0},
 _user: { type: Schema.Types.ObjectId, ref: 'User'},
 _question: {type: Schema.Types.ObjectId, ref: 'Question'}

}, { timestamps: true });



var User = mongoose.model('User', UsersSchema)
var Question = mongoose.model('Question', QuestionsSchema)
var Answer = mongoose.model('Answer', AnswersSchema)