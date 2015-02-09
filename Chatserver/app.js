var app = angular.module("ChatApp", ['ngRoute', 'ui.bootstrap']);

//Þurfum ekki ng-controller, er defined hér.. 
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/views/home.html",
		controller: "LoginController"
	}).when("/room/:roomName", {
		templateUrl: "src/views/room.html",
		controller: "RoomController"
	}).otherwise({ redirectTo: "/" });	
}]);

