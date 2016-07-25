(function(){
	'use strict'

	angular
		.module('app')
		.controller('headerController', Controller)
		.$inject = ['$scope', 'userFactory', '$location', '$cookies']

	function Controller($scope, userFactory, $location, $cookies) {

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

		_this.logout = function () {
	      userFactory.logout(function () {
	        $location.url('/')
	      })
	    }

	}
})()