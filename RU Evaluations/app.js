var app = angular.module("evaluationApp", ['ngRoute']);
 
 app.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/Views/login.html",
		controller: "LoginController"
	}).when("/admin", {
		templateUrl: "src/Views/admin.html",
		controller: "AdminController"
	}).when("/createeval", {
		templateUrl: "src/Views/create-eval.html",
		controller: "CreateEvalController"
	}).when("/student", {
		templateUrl: "src/Views/student.html",
		controller: "StudentController"
	}).otherwise({ redirectTo: "/" });	

	//Whitelist fyrir cross origin resource loads
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.
    'http://dispatch.hir.is/api/**'
  	]);
}]);