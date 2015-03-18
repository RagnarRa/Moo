angular.module("evaluationApp").controller("AdminController", ["$scope", "$location", "$filter", "UserService", "TemplateService", function($scope, $location, $filter, UserService, TemplateService) {
	$scope.templates = [];
    $scope.resultMsg = "";
    $scope.evaluations = []; 
    $scope.courses = [];

	TemplateService.getTemplates().success(function(data) {
		$scope.templates = data; 
	}).error(function(data, status, headers, config) {
			console.log("Get templates error, status: " + status + ", Headers:");
			console.log(headers);
            $scope.resultMsg = "Error, could not fetch any templates";
		});

	TemplateService.getEvaluations().success(function(data) {
			$scope.evaluations = data;
	});

	$scope.createEval = function() {
		$location.path("/createeval");
	};

    //opens an evaluation for students
	$scope.addTemplate = function() {
		var startDate = $filter('date')($scope.startDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'GMT');
		var endDate = $filter('date')($scope.endDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'GMT');
		console.log("Template ID: " + $scope.templateID);
		console.log("Start date formatted: " + startDate);
		console.log("End date formatted: " + endDate);

        //opens an evaluation for students
		TemplateService.addEvaluation($scope.templateID, startDate, endDate).success(function() {
			console.log("Successfully added a template..");
            $scope.resultMsg = "Evaluations successfully added";

		}).error(function(data, status, headers, config) {
			console.log("Login error, status: " + status + ", Headers:");
			console.log(headers);
            $scope.resultMsg = "Error, unable to add evaluation";

		}); 
	};

	$scope.getEvaluationResults = function() {
		TemplateService.getEvaluationByID($scope.evalID).success(function(data) {
			console.log("Got the evaluations..");
			console.log(data);
			$scope.courses = data.Courses; 
		});
	};
	
}]);