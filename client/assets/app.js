(function(){
	'use strict'

angular.module('app', ['ngRoute', 'ngCookies']).config(config);

	function config($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'views/login.html'
		})
		.when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'dashboardController'
		})
		.when('/create', {
			templateUrl: 'views/newpoll.html'
		})
		.when('/poll/:id', {
			templateUrl: 'views/poll.html'
		})
		.otherwise('/', {
			redirectTo: "/index"
		});
	}

})()