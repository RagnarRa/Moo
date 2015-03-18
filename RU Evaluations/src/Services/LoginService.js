angular.module("evaluationApp").factory("LoginService", ["$http", "UserService", function($http, UserService) {
	return {
		logIn: function(username, password) {
			var objToSend = { "user" : username,
							  "pass" : password };
			return $http({ method: "POST",
						   url: "http://dispatch.ru.is/h11/api/v1/login",
						   data: objToSend }).success(function(data, status, headers, config) {
						   		UserService.setToken(data.Token);
						   		UserService.setUsername(data.User.Username);
						   }).error(function(data, status, headers, config) {
						   		console.log("Log in error!");
						   });
		}
	};
}]);