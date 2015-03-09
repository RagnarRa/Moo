angular.module("evaluationApp").factory("TemplateService", ["$http", "UserService", function($http, UserService) {
	//url: "http://dispatch.ru.is/demo/api/v1/evaluationtemplates
	var backendUrl = 'http://dispatch.ru.is/demo/api/v1/';
	return {
		//Templates
		createTemplate : function(template) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "POST",
				url: backendUrl + "evaluationtemplates",
				data: template,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getTemplates : function() {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "evaluationtemplates",
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getTemplateByID : function(ID) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "evaluationtemplates/" + ID,
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		//Evaluations
		addEvaluation : function(tID, start, end) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "POST",
				url: backendUrl + "evaluations",
				data: {
					"TemplateID" : tID,
					"StartDate" : start,
					"EndDate" : end
				},
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getEvaluations: function() {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "evaluations",
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getEvaluationByID: function(ID) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "evaluations/" + ID,
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		//My
		getCoursesForStudent: function() {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "my/courses",
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getEvaluationsForStudent: function() {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "my/evaluations",
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		//Courses
		getTeachersForCourse: function(course, semester) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "courses/" + course + "/" + semester + "/teachers",
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		getEvaluationForCourseByEvalID: function(course, semester, evalID) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "GET",
				url: backendUrl + "courses/" + course + "/" + semester + "/evaluations/" + evalID,
				data: null,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		},
		saveAnswersToEvaluationInCourse: function(course, semester, evalID, evaluationAnswers) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "POST",
				url: backendUrl + "courses/" + course + "/" + semester + "/evaluations/" + evalID,
				data: evaluationAnswers,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		}
	};
}]);