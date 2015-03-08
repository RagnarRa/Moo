angular.module("evaluationApp").controller("AnswerEvalController", ["$scope", "$location", "$routeParams", "TemplateService", function($scope, $location, $routeParams, TemplateService) {	
	$scope.evaluation = {};
	$scope.evaluationAnswers = []; 
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID;
	console.log("Course ID " + courseID + ", semester: " + semester + ", evalID: " + evalID); 

	TemplateService.getEvaluationForCourseByEvalID(courseID, semester, evalID).success(function(data) {
		console.dir(data);
		$scope.evaluation = data; 
	});
}]);