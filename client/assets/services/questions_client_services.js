(function(){

	'use strict'

	angular
	.module('app')
	.factory('questionFactory', questionFactory)
	.$inject = ['$http']

	function questionFactory($http) {

		var factory = {};

		var question = null;

		factory.index = function(callback){
			$http.get('/questions').then(function(res){
				if(res.data) {
					callback(res);
				}
			})
			.catch(function (err) {
	          console.log(err)
	        })
		}
		
		factory.create = function(params, callback){
			// console.log(params)
			$http.post('/questions', params).then(function(res){
				console.log(res, "in question factory");
				if (res.status) {
       				question = res.data
		          }
		          callback(question)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}

		factory.show = function(params, callback){
			$http.get('/questions/'+ params.id, params).then(function(res){
				if (res.status) {
	   				question = res.data
	   				callback(question)
	   				console.log(question, 'this is the question')
		          }
		          
		          
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}

		return factory;
	}
})()
