var app = angular.module("evaluationApp", ['ngRoute']);
 
 app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/Views/test.html",
		controller: "TestController"
	}).otherwise({ redirectTo: "/" });	
}]);