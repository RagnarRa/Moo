angular.module("evaluationApp").factory("LoginService", ["$http", function($http) {
	var username = "", token = "";
	var socket;
	return {
		logIn: function(username, password) {
			var objToSend = { "user" : username,
							  "pass" : password };
			return $http({ method: "POST",
						   url: "http://dispatch.hir.is/demo/api/v1/login",
						   data: objToSend }).success(function(data, status, headers, config) {
						   		console.log("Logged in!");
						   		console.dir(data);
						   		token = data.Token;
						   		username = data.User.Username; 
						   }).error(function(data, status, headers, config) {
						   		console.log("Log in error!");
						   });

		},
		getToken: function() {
			return token;
		},
		getUsername: function() {
			return username; 
		}
	};
}]);