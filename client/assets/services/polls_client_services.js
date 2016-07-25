(function(){

	'use strict'

	angular
	.module('app')
	.factory('pollFactory', pollFactory)
	.$inject = ['$http']

	function pollFactory($http) {

		var factory = {};

		var poll = null;

		factory.index = function(callback){
			$http.get('/polls').then(function(res){
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
			$http.post('/polls', params).then(function(res){
				console.log(res, "in poll factory");
				if (res.status) {
       				poll = res.data
		          }
		          callback(poll)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}

		factory.show = function(params, callback){
			$http.get('/polls/'+ params.id, params).then(function(res){
				if (res.status) {
	   				poll = res.data
	   				
		          }
				callback(poll)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}

		factory.vote = function(params, callback){
			$http.put('/polls/' + params._pollid, params).then(function(res) {
				if (res.status) {
	   				poll = res.data
	   				
		          }
				callback(poll)
		        })
		        .catch(function (err) {
		          console.log(err)
				})
		}

		factory.delete = function(params, callback){
			console.log(params._id, 'in factory delete')
			$http.delete('/polls/' + params._id, params).then(function(res){
				console.log('successfully deleted')
			})
			.catch(function (err) {
		          console.log(err)
				})
		}

		return factory;
	}
})()
