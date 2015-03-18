angular.module("evaluationApp").factory("UserService", [function() {
	var username = "", token = "", role = "";
	var socket;
	return {
		setToken: function(incToken) {
			token = incToken;
		}, 
		getToken: function() {
			return token;
		},
		setUsername: function(incUsername) {
			username = incUsername; 
		},
		getUsername: function() {
			return username; 
		},
		setRole: function(incRole) {
			role = incRole;
		},
		getRole: function() {
			return role;
		}
	};
}]);