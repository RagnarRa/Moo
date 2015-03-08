angular.module("evaluationApp").controller("StudentController", ["$scope", "$location", "TemplateService", function($scope, $location, TemplateService) {
	TemplateService.getEvaluationsForStudent().success(function(data) {
		$scope.evaluations = data;
		console.log(data);
	}).error(function(data, status, headers, config) {
			console.log("Get Evaluations For Student Error, status: " + status + ", Headers:");
			console.log(headers);
		});
}]);