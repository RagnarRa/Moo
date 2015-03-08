angular.module("evaluationApp").controller("AdminController", ["$scope", "$location", "$filter", "UserService", "TemplateService", function($scope, $location, $filter, UserService, TemplateService) {
	$scope.templates = [];
	TemplateService.getTemplates().success(function(data) {
		$scope.templates = data; 
	}).error(function(data, status, headers, config) {
			console.log("Get templates error, status: " + status + ", Headers:");
			console.log(headers);
		});

	$scope.createEval = function() {
		$location.path("/createeval");
	};

	$scope.addTemplate = function() {
		var startDate = $filter('date')($scope.startDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'GMT');
		var endDate = $filter('date')($scope.endDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'GMT');
		console.log("Template ID: " + $scope.templateID);
		console.log("Start date formatted: " + startDate);
		console.log("End date formatted: " + endDate);

		TemplateService.addEvaluation($scope.templateID, startDate, endDate).success(function() {
			console.log("Successfully added a template..");
		}).error(function(data, status, headers, config) {
			console.log("Login error, status: " + status + ", Headers:");
			console.log(headers);
		}); 
	};

	$scope.test = function() {
		var obj = null;
		TemplateService.getEvaluations().success(function(data) {
			obj = data;
			console.log("Evaluation templates: ");
			console.log(obj);
		});

		TemplateService.getEvaluationByID(42).success(function(data) {
			console.log("Evaluation with ID 42");
			console.log(data);
		});

		TemplateService.getEvaluationByID(50).success(function(data) {
			console.log("Evaluation with ID 50");
			console.log(data);
		});
	};
}]);