angular.module("evaluationApp").controller("AnswerEvalController", ["$scope", "$location", "$routeParams", "TemplateService", function($scope, $location, $routeParams, TemplateService) {	
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID;
	console.log("Course ID " + courseID + ", semester: " + semester + ", evalID: " + evalID); 

	TemplateService.getEvaluationForCourseByEvalID(courseID, semester, evalID).success(function(data) {
		console.dir(data);
	});
}]);