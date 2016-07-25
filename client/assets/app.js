(function(){
	'use strict'

angular.module('app', ['ngRoute', 'ngCookies']).config(config);

	function config($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'views/login.html',
			controller: 'questionsController'
		})
		.when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'questionsController'
		})
		.when('/new_question', {
			templateUrl: 'views/newquestion.html',
			controller: 'questionsController'
		})
		.when('/question/:id', {
			templateUrl: 'views/question.html',
			controller: 'questionsController'
		})
		.when('/question/:id/new_answer', {
			templateUrl: 'views/newanswer.html',
		})
		.otherwise('/', {
			redirectTo: "/index"
		});
	}

})()