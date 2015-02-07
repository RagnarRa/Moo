app.controller("RoomController", ["$scope", "$routeParams", "SocketService", function($scope, $routeParams, SocketService) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";

	var socket = SocketService.getSocket();

	if(socket) {

		/* Joinroom: roomName er undefined ef verið er að búa til room..The server responds by emitting the following events: 
		   "updateusers" (to all participants in the room), "updatetopic" (to the newly joined user, not required to handle this), 
		   "servermessage" with the first parameter set to "join" ( to all participants in the room, informing about the newly added user). 
		   If a new room is being created, the message "updatechat" is also emitted.  
		*/
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {

		});

		socket.on("updatechat", function(roomname, messageHistory) {
			console.log(messageHistory);
			$scope.messages = messageHistory;
			$scope.$apply(); //Events from Socket.IO not visible to angular by default
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
				$scope.users = users;
			}
		});
	}

	$scope.send = function() {
		if(socket) {
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage }); //The server will then emit the "updatechat" event, after the message has been accepted.
			$scope.currentMessage = "";
		}
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
}]);