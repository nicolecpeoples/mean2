(function(){
	'use strict'

	angular
		.module('app')
		.controller('headerController', Controller)
		.$inject = ['$scope', 'userFactory', '$location']

	function Controller($scope, userFactory, $location) {

		var _this = this;

	      userFactory.getSession(function (data) {
	        if (data != null) {
	          _this.user = data
	        } else {
	          $location.url('/')
	        }
	      })

		_this.logout = function () {
	      userFactory.logout(function () {
	        $location.url('/')
	      })
	    }

	}
})()