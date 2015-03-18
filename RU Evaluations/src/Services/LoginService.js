angular.module("evaluationApp").factory("LoginService", ["$http", "UserService", function($http, UserService) {
	return {
		logIn: function(username, password) {
			var objToSend = { "user" : username,
							  "pass" : password };
			return $http({ method: "POST",
						   url: "http://dispatch.ru.is/demo/api/v1/login",
						   //url: "http://localhost:19358/api/v1/login",
						   data: objToSend }).success(function(data, status, headers, config) {
						   		console.log("Logged in!");
						   		console.dir(data);
						   		UserService.setToken(data.Token);
						   		UserService.setUsername(data.User.Username);
						   		console.log("getToken: " + UserService.getToken());
						   }).error(function(data, status, headers, config) {
						   		console.log("Log in error!");
						   });
		}
	};
}]);