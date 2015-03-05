var app = angular.module("evaluationApp", ['ngRoute']);
 
 app.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/Views/login.html",
		controller: "LoginController"
	}).otherwise({ redirectTo: "/" });	

	//Whitelist fyrir cross origin resource loads
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.
    'http://dispatch.hir.is/api/**'
  	]);
}]);