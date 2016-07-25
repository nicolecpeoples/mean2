(function(){
	'use strict'

	angular
	.module('app')
	.controller('showPollsController', Controller)
	.$inject = ['$scope', 'pollFactory', '$routeParams', '$location', 'userFactory']

function Controller($scope, pollFactory, $routeParams, $location, userFactory) {

		var _this= this;
		_this.poll = {};
		_this.poll_id = $routeParams;

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

	    pollFactory.show(_this.poll_id, function(returned_data){
	    	console.log(returned_data)
			_this.poll = returned_data;
		})

		_this.vote = function(param1, param2) {
			var num = param2._id
			_this.option = {}
			_this.option.option = "option" + num;

			_this.option._pollid = param1._id
			pollFactory.vote(_this.option);
		}

	}



})()