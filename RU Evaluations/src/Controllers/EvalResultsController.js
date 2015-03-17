angular.module("evaluationApp").controller("EvalResultsController", ["$scope", "$location", "$routeParams", "UserService", "TemplateService", function($scope, $location, $routeParams, UserService, TemplateService) {
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID; 
	var evaluationResults = [];
	$scope.templateTitle = "";
	$scope.courseName = "";
	$scope.courseEvaluationResult = {};
    
	TemplateService.getEvaluationByID(evalID).success(function(data) {
			console.log("Got the evaluations..");
			console.log(data);
			
			evaluationResults = data;
			$scope.templateTitle = evaluationResults.TemplateTitle;
			
			for (var i = 0; i < evaluationResults.Courses.length; i++) {
				if (evaluationResults.Courses[i].CourseID === courseID && evaluationResults.Courses[i].Semester === semester) {
					$scope.courseEvaluationResult = evaluationResults.Courses[i];
					$scope.courseName = $scope.courseEvaluationResult["CourseName"];
				}
			}

			console.log($scope.courseEvaluationResult);
	}); 


}]);