angular.module("evaluationApp").controller("LoginController", ["$scope", "$location", "LoginService", function($scope, $location, LoginService) {
	$scope.username = "";
    $scope.password = "";
	$scope.token = "";
    $scope.errorMsg="";

	$scope.logIn = function(username, password) {
        $scope.errorMsg="";
		LoginService.logIn(username, password).success(function(data) {
			if (data.User.Role === "admin") {
				$location.path("/admin");
			}
			else {
				$location.path("/student");
			}
		}).error(function(data, status, headers, config) {
			console.log("Login error, status: " + status + ", Headers:");
			console.log(headers);
            $scope.errorMsg="Unable to login, please try again.";
		});
	};

}]);