var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UsersSchema = new mongoose.Schema({
	username: {type: String, required: true, minlength: 3, maxlength: 256, unique: true, trim: true},
	_polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}],
  
}, {timestamps: true})


var PollSchema = new mongoose.Schema({
	question: { type: String, minlength: 8, required: true},
		  
	 options: {
		option1: { _id: {type: Number, default: 1 }, text: {type: String, minlength: 3},  votes: {type: Number, default: 0 }    } ,
		option2: { _id: {type: Number, default: 2 }, text: {type: String, minlength: 3},  votes: {type: Number, default: 0 }    } ,
		option3: { _id: {type: Number, default: 3 }, text: {type: String, minlength: 3},  votes: {type: Number, default: 0 }    } ,
		option4: { _id: {type: Number, default: 4 }, text: {type: String, minlength: 3},  votes: {type: Number, default: 0 }    } 
	}, 

	_user: { type: Schema.Types.ObjectId, ref: 'User'}
 
}, { timestamps: true });


var User = mongoose.model('User', UsersSchema)
var Poll = mongoose.model('Poll', PollSchema)