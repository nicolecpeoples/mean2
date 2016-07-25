(function(){

	'use strict'

	angular
	.module('app')
	.factory('userFactory', userFactory)
	.$inject = ['$http']

	function userFactory($http) {

		var factory = {};

		var user = null;
		function getSession (callback) {
	      $http.get('/session')
	        .then(function (res) {
	          console.log(res)
	          if (res.data.status) {
	            user = res.data.user
	            callback(user)
	          }
	        })
	        .catch(function (err) {
	          console.log(err)
	        })
	    }

		
		factory.create = function(params, callback){
			$http.post('/users', params).then(function(res){
				console.log(res, "in user factory");
				if (res.status) {
       				user = res.data
		          }
		          callback(user)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}
			
		factory.getSession = function(callback){
			$http.get('/users').then(function(res){
				if(res.status) {
					callback(res.data)
				}
				else {
					callback(res.errors)
				}
			})
		}
		
		factory.getSessionUser = function(callback){
			getSession(callback);
		}

		factory.logout= function(callback){
			$http.get('/logout').then(function(res){
				console.log(res.status)
				if (res.status) {
		            user = null
		          }
		          callback()
		        })
		        .catch(function (err) {
		          console.log(err)
		        
				})
		}
	
		return factory;
	}
})()

