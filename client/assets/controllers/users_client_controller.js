(function(){
	'use strict'

	angular
		.module('app')
		.controller('usersController', Controller)
		.$inject = ['$scope', 'userFactory', '$location']

	function Controller($scope, userFactory, $location) {

		var _this = this;

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
	    
		_this.create = function(){
			console.log(_this.newUser);
			userFactory.create(_this.newUser, function(factory_data){
				console.log(factory_data);
				if(factory_data.status){
					_this.user = factory_data.userInfo
					$location.url('/dashboard')
					
				} else {
					_this.errors = factory_data.errors;
				}
			});
		}

		

	}
})()