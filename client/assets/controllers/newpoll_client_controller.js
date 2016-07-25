(function(){
	'use strict'

	angular
		.module('app')
		.controller('pollsController', Controller)
		.$inject = ['$scope', 'pollFactory', 'userFactory', '$location']

	function Controller($scope, pollFactory, userFactory, $location) {

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

	    pollFactory.index(function(data){
	    	_this.questions = data.data.questions;
	    })

		_this.create = function(){
			var poll = _this.newPoll;
			poll._user = _this.user.user.id;

			pollFactory.create(poll, function(factory_data){
				console.log(factory_data)
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