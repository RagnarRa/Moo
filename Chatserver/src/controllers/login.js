app.controller("LoginController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	$scope.username = "";
	$scope.message = "";
	var socket = io.connect('http://localhost:8080'); //chatserver keyrir á localhost:8080

	$scope.connect = function() {
		if(socket) {
			socket.emit("adduser", $scope.username, function(available) {
				if(available) {
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.username);

					$location.path("/room/lobby"); 
				}
				else {
					$scope.message = "Your name is taken, please choose another.";
				}
				$scope.$apply(); //Events from Socket.IO not visible to angular by default
			});
		}
	};
}]);