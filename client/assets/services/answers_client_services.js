(function(){

	'use strict'

	angular
	.module('app')
	.factory('answerFactory', answerFactory)
	.$inject = ['$http']

	function answerFactory($http) {

		var factory = {};

		var answer = null;

		
		factory.create = function(params, callback){

			$http.post('/answers', params).then(function(res){
				console.log(res, "in answer factory");
				if (res.status) {
       				answer = res.data
		          }
		          callback(answer)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}
			

		factory.show = function(params, callback){
			console.log(params.id, 'in answer factory')
			$http.get('/answers/'+  params.id, params).then(function(res){
				if (res.status) {
       				answer = res.data
       				console.log(answer, 'response from server')
       				
		          }
		          callback(answer)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}


	
		return factory;
	}
})()

