(function(){
	'use strict'

	angular
		.module('app')
		.controller('dashboardController', Controller)
		.$inject = ['$scope', 'pollFactory', 'userFactory', '$location']

	function Controller($scope, pollFactory, userFactory, $location) {

		var _this = this;
		_this.user;

	      userFactory.getSession(function (data) {

	        if (data != null) {

	          _this.user = data.user
	          console.log(_this.user)

	        } else {
	          $location.url('/')
	        }
	      })

	    pollFactory.index(function(data){
	    	console.log(data.data.questions, 'this is the data in the dashboard controller')
	    	_this.polls = data.data.questions;
	    })

	    _this.delete = function(params) {
	    	console.log(params)
	    	pollFactory.delete(params)
	    	$location.url('/dashboard');
	    }

		
	}
})()