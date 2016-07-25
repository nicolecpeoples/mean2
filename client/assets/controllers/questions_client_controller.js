(function(){
	'use strict'

	angular
		.module('app')
		.controller('questionsController', Controller)
		.$inject = ['$scope', 'questionFactory', 'userFactory', '$location']

	function Controller($scope, questionFactory, userFactory, $location) {

		var _this = this;
		_this.user;

		activate();

		function activate () {
	      userFactory.getSession(function (data) {
	        if (data != null) {

	          _this.user = data
	        } else {
	          $location.url('/')
	        }
	      })
	    }

	    questionFactory.index(function(data){
	    	_this.questions = data.data.questions;
	    })

		_this.create = function(){
			var question = _this.newQuestion;
			question._user = _this.user.user.id;

			questionFactory.create(question, function(factory_data){
				if(factory_data){
					_this.questions = factory_data.data
					$location.url('/dashboard')
					
				} else {
					_this.errors = factory_data.errors;
				}

			});

		}

		_this.cancel = function(){
			$location.url('/')
		}

	}
})()