angular.module("evaluationApp").factory("TemplateService", ["$http", "UserService", function($http, UserService) {
	//url: "http://dispatch.ru.is/demo/api/v1/evaluationtemplates
	return {
		//Templates
		createTemplate : function(template) {
			var token = UserService.getToken();
			console.log("Using token: " + token);
			return $http({
				method: "POST",
				url: "http://dispatch.ru.is/demo/api/v1/evaluationtemplates",
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
				url: "http://dispatch.ru.is/demo/api/v1/evaluationtemplates",
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
				url: "http://dispatch.ru.is/demo/api/v1/evaluationtemplates/" + ID,
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
				url: "http://dispatch.ru.is/demo/api/v1/evaluations",
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
				url: "http://dispatch.ru.is/demo/api/v1/evaluations",
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
				url: "http://dispatch.ru.is/demo/api/v1/evaluations/" + ID,
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
				url: "http://dispatch.ru.is/demo/api/v1/my/courses",
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
				url: "http://dispatch.ru.is/demo/api/v1/my/evaluations",
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
				url: "http://dispatch.ru.is/demo/api/v1/courses/" + course + "/" + semester + "/teachers",
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
				url: "http://dispatch.ru.is/demo/api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID,
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
				url: "http://dispatch.ru.is/demo/api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID,
				data: evaluationAnswers,
				headers: {
					'Authorization' : 'Basic ' + token
				}
			});
		}
	};
}]);