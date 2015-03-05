angular.module("evaluationApp").controller("LoginController", ["$scope", "$location", "LoginService", function($scope, $location, LoginService) {
	$scope.username = "";
	$scope.token = "";

	$scope.logIn = function(username, password) {
		LoginService.logIn(username, password);
		$scope.token = LoginService.getToken();
		$scope.username = LoginService.getUsername();
		console.log("Token: " + $scope.token);
		console.log("Username: " + $scope.username);
	};
}]);