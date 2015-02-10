angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "SocketService", "$location", function($scope, $routeParams, SocketService, $location) {
	$scope.roomName = $routeParams.roomName;
	//$scope.currentMessage = "";
	$scope.currentMessage = { message: ""}; //Tab býr til nýtt scope, þarf að nota dot syntax til að komast í þetta scope
	$scope.currentPM = { PM: "" };
	$scope.privateMessages = []; // { from: fromUser, messages: [ { from: fromUser, msg: message }, { from: x, msg: y } ] }
	$scope.tabs = [ { title: $scope.roomName, active: true, isRoom: true } ];
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
			var hasPMFromUser = false, hasTabWithUser = false;
			//Athugum hvort við séum með message history við þennan notanda.. bætum þá við hana..
			for (var i = 0; i < $scope.privateMessages.length; i++) {
				if ($scope.privateMessages[i].from === fromUser) {
					$scope.privateMessages[i].messages.push({ from: fromUser, msg: message });
					hasPMFromUser = true;
					break;
				}
			}

			if (!hasPMFromUser) {
				$scope.privateMessages.push({ from: fromUser, messages: [ { from: fromUser, msg: message } ] });
			}

			//Athugum hvort tab sé til fyrir..
			for (i = 0; i < $scope.tabs.length; i++) {
				if ($scope.tabs[i].title === fromUser) {
					hasTabWithUser = true;
					break;
				}
			}

			if (!hasTabWithUser) {
				$scope.tabs.push({ title: fromUser, active: false, isRoom: false });
			}

			$scope.$apply();
		});
	}

	$scope.send = function() {
		if ($scope.currentMessage.message.length > 0 && $scope.currentMessage.message[0] == '/') { //Skipun 
			var usernameArray; 
			$scope.currentMessage.message = $scope.currentMessage.message.slice(1); // / í burtu
			var regex = /^kick \S+$/; //Athugum hvort þetta sé kick + 1 parameter

			if ($scope.currentMessage.message.match(regex) !== null) { //Kick
				regex = /[^\s]+\S+$/; //Náum í username á notanda sem á að sparka
				usernameArray = $scope.currentMessage.message.match(regex);
				socket.emit("kick", { user : usernameArray[0], room : $scope.roomName }, function(wasKicked) { });
			} 

			regex = /^ban \S+$/; //Athugum hvort ban + 1 parameter

			if ($scope.currentMessage.message.match(regex) !== null) { //Ban
				regex = /[^\s]+\S+$/; //Náum í username á notanda sem á að banna
				usernameArray = $scope.currentMessage.message.match(regex);
				socket.emit("ban", { user : usernameArray[0], room: $scope.roomName }, function(wasBanned) {});
			}

			regex = /^msg \S+ .+$/; //Athugum hvort msg + 2 parameters

			if ($scope.currentMessage.message.match(regex) !== null) { //Message
				processSendPMCommand();
			}

			$scope.currentMessage.message = "";
		}
		else { //Venjulegt message
			if(socket) {
				socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage.message }); //The server will then emit the "updatechat" event, after the message has been accepted.
				$scope.currentMessage.message = "";
			}
		}
	};

	function processSendPMCommand() {
		var regex = /^(msg) (\S+) (.+)$/; //Náum í username á notanda sem á að PM-a
		var parameters = $scope.currentMessage.message.match(regex); //[1] er msg, [2] er username, [3] er message.... 
		socket.emit("privatemsg", { nick: parameters[2], message: parameters[3] }, function (wasMessaged) {});
		var hasPMHistory = false, hasTabWithUser = false;


		//Athugum hvort við séum með samræður við notandan.. viljum þá bæta við þær..
		for (var i = 0; i < $scope.privateMessages.length; i++) {
			if ($scope.privateMessages[i].from === parameters[2]) { //Ef med PM vid thennan notanda.. 
				$scope.privateMessages[i].messages.push({ from: SocketService.getUsername(), msg: parameters[3]});
				hasPMHistory = true;
				break;
			}
		}

		if (!hasPMHistory) {
	    	//from user we're sending to.. a message.. from us.. 
			$scope.privateMessages.push({ from: parameters[2], messages: [{ from: SocketService.getUsername(), msg: parameters[3] }]});
		}

		//Athugum hvort tab se opinn fyrir thennan notanda

		for (i = 0; i < $scope.tabs.length; i++) {
			if ($scope.tabs[i].title === parameters[2]) { //Tab opinn.. 
				hasTabWithUser = true;
				break;
			}
		}
		if (!hasTabWithUser) {
			$scope.tabs.push({ title: parameters[2], isActive: false, isRoom: false });
		}
	}

	$scope.leaveRoom = function() {
		if (socket) {
			socket.emit("partroom", $scope.roomName);
			$location.path("/");
		}
	};

	$scope.keyPress = function($event, isPM, PMToUser) {
		if($event.keyCode === 13) {
			if (isPM) {
				$scope.sendPM(PMToUser);
			}
			else {
				$scope.send();
			}
		}
	};

	$scope.sendPM = function(user) {
		socket.emit("privatemsg", { nick: user, message: $scope.currentPM.PM }, function (wasMessaged) {});

		//Finnum private message convo við þennan user
		for (var i = 0; i < $scope.privateMessages.length; i++) {
			if ($scope.privateMessages[i].from === user) {
				$scope.privateMessages[i].messages.push({ from: SocketService.getUsername(), msg: $scope.currentPM.PM });
				break;
			}
		}

		$scope.currentPM.PM = "";
	};
}]);