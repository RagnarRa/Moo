angular.module("evaluationApp").controller("AdminController", ["$scope", "$location", "$filter", "UserService", "TemplateService", function($scope, $location, $filter, UserService, TemplateService) {
	$scope.templates = [];
    $scope.resultMsg = "";
    //todo: make datetieme show without millisecconds
    /*
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.endDate.setDate($scope.endDate.getDate() + 1); */
    /*todo: delete this
        TemplateService.getEvaluationByID(6).success(function(data) {
        console.log("Saved evaluation..");
        console.log(data);
    });*/

	TemplateService.getTemplates().success(function(data) {
		$scope.templates = data; 
	}).error(function(data, status, headers, config) {
			console.log("Get templates error, status: " + status + ", Headers:");
			console.log(headers);
            $scope.resultMsg = "Error, could not fetch any templates";
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

	/* todo: delete me
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
	};*/
}]);