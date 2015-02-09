angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "SocketService", "$location", function($scope, $routeParams, SocketService, $location) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.privateMessages = null;

	var socket = SocketService.getSocket();

	if(socket) {

		/* Joinroom: roomName er undefined ef verið er að búa til room..The server responds by emitting the following events: 
		   "updateusers" (to all participants in the room), "updatetopic" (to the newly joined user, not required to handle this), 
		   "servermessage" with the first parameter set to "join" ( to all participants in the room, informing about the newly added user). 
		   If a new room is being created, the message "updatechat" is also emitted.  
		*/
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {
			if (!success && errorMessage === "banned") { //T.d. ef banned
				$location.path("/");
			}
			$scope.$apply();
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
			$scope.$apply();
		});

		socket.on("kicked", function(room, userKicked, kickedBy) {
			console.log("Notandanafn mitt: " + SocketService.getUsername());
			console.log("Kicked: " + userKicked);
			if (SocketService.getUsername() === userKicked) {
				$location.path("/");
			}
		});

		socket.on("banned", function(room, userBanned, bannedBy) {
			if (SocketService.getUsername() === userBanned) {
				$location.path("/");
			}
		});

		socket.on("recv_privatemsg", function(fromUser, message) {
			//Athugum hvort við séum með previous skilaboð frá þessum user..
			for (var i = 0; i < privateMessages.length; i++) {
				if (privateMessages[i].from === fromUser) {
					privateMessages[i].messages.push(message);
					return; 
				}
			}
			
			privateMessages.push({ from: fromUser, messages: [message]});
		});
	}

	$scope.send = function() {
		if ($scope.currentMessage.length > 0 && $scope.currentMessage[0] == '/') { //Skipun 
			
			$scope.currentMessage = $scope.currentMessage.slice(1); // / í burtu
			var regex = /^kick \S+$/; //Athugum hvort þetta sé kick + 1 parameter

			if ($scope.currentMessage.match(regex) !== null) { //Kick
				regex = /[^\s]+\S+$/; //Náum í username á notanda sem á að sparka
				var usernameArray = $scope.currentMessage.match(regex);
				console.log("Notandi: " + usernameArray[0]);
				console.log("Room: " + $scope.roomName);
				socket.emit("kick", { user : usernameArray[0], room : $scope.roomName }, function(wasKicked) { });
			} 

			regex = /^ban \S+$/; //Athugum hvort ban + 1 parameter

			if ($scope.currentMessage.match(regex) !== null) { //Ban
				regex = /[^\s]+\S+$/; //Náum í username á notanda sem á að banna
				var usernameArray = $scope.currentMessage.match(regex);
				socket.emit("ban", { user : usernameArray[0], room: $scope.roomName }, function(wasBanned) {});
			}
		}
		else { //Venjulegt message
			if(socket) {
				//console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
				socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage }); //The server will then emit the "updatechat" event, after the message has been accepted.
				$scope.currentMessage = "";
			}
		}
	};

	$scope.leaveRoom = function() {
		if (socket) {
			socket.emit("partroom", $scope.roomName);
			$location.path("/");
		}
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
}]);