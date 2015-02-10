angular.module("ChatApp").controller("LoginController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	$scope.username = "";
	$scope.usernameTaken = false; 
	$scope.rooms = {};
	$scope.showRooms = SocketService.getUsername(); //Show rooms ef notandi var logged in (t.d. ef honum er kicked ur room)
	$scope.roomCount = 0;
	$scope.selectedRoom = null;
	$scope.nameOfRoomToCreate = null;
	var socket = io.connect('http://localhost:8080'); //chatserver keyrir á localhost:8080
	
	socket.emit("rooms");

	$scope.connectToServer = function() {
		if(socket) {
			//Callback segir okkur hvort notandanafn var available..
			socket.emit("adduser", $scope.username, function(available) {
				if(available) {
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.username);
					//$location.path("/room/lobby"); 
					socket.emit("rooms"); //Server svarar med thvi ad senda ut roomlist event
					$scope.showRooms = true; 
				}
				else {
					$scope.usernameTaken = true;
				}
				$scope.$apply(); //Events from Socket.IO not visible to angular by default
			});
		}
	};

	$scope.joinRoom = function() {
		if ($scope.selectedRoom !== null) {
			console.log("Joining room: " + $scope.selectedRoom);
			console.dir($scope.selectedRoom);
			$location.path("/room/" + $scope.selectedRoom);
		}
		else {
			$location.path("/room/lobby");
		}
	};

	$scope.createRoom = function() {
		//Býr til herbergið og bætir user við sem op
		socket.emit("joinroom", { room: $scope.nameOfRoomToCreate, pass: "" }, function(success, errorMessage) {});
		$location.path("/room/" + $scope.nameOfRoomToCreate);
		console.log("Room to create: " + $scope.nameOfRoomToCreate);
	};

	//Hlustum eftir roomlist
	if (socket) {
		socket.on("roomlist", function(roomlist) {
			$scope.rooms = roomlist; 
			//$scope.showRooms = true; 
			console.dir(roomlist);
			$scope.roomCount = Object.keys(roomlist).length;
			$scope.$apply(); //Events from Socket.IO not visible to angular by default
		});
	}
}]);