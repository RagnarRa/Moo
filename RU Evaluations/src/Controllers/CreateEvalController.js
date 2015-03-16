angular.module("evaluationApp").controller("CreateEvalController", ["$scope", "$location", "UserService", "TemplateService", function($scope, $location, UserService, TemplateService) {	
	$scope.questions = { "CourseQuestions" : [], "TeacherQuestions" : []};
	$scope.courseQuestionType = "";
	$scope.teacherQuestionType= "";

	//types: Course question (0), Teacher Question (1)
	$scope.addQuestion = function(type) {
		if (type === 0) { //Course
			if ($scope.courseQuestionType !== "text") { //Need to add an answers property (and give the user a chance to add answers)..
				console.log("not text");
				//Indexed so we can add answers to it from the view.. where we lose indexing by using filters.
				$scope.questions.CourseQuestions.push({ "Index" : $scope.questions.CourseQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.courseQuestionType, "Answers" : []});
			}
			else {
				console.log("text");
				$scope.questions.CourseQuestions.push({ "Index" : $scope.questions.CourseQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.courseQuestionType});
			}
		}

		else if (type === 1) { //Teacher
			if ($scope.teacherQuestionType !== "text") { //Need to add an answers property (and give the user a chance to add answers)..
				console.log("not text");
				//Indexed so we can add answers to it from the view.. where we lose indexing by using filters.
				$scope.questions.TeacherQuestions.push({ "Index" : $scope.questions.TeacherQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.teacherQuestionType, "Answers" : []});
			}
			else {
				console.log("text");
				$scope.questions.TeacherQuestions.push({ "Index" : $scope.questions.TeacherQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.teacherQuestionType});
			}
		}
	};

	/* index: index a object i CourseQuestions/TeacherQuestions sem vid viljum baeta vid spurningu i.. 
	   type: Course question (0), Teacher question (1). 
	*/
	$scope.addAnswer = function(index, type) {
		if (type === 0) { //Course
			$scope.questions.CourseQuestions[index]["Answers"].push({ "Text" : "", "TextEN" : "", "ImageURL" : "", Weight: 0 });
		}
		else if (type === 1) { //Teacher
			$scope.questions.TeacherQuestions[index]["Answers"].push({ "Text" : "", "TextEN" : "", "ImageURL" : "", Weight: 0 });
		}
	};

	$scope.createEval = function(evaluation) {
		$scope.evaluation = evaluation;
		$scope.evaluation["CourseQuestions"] = $scope.questions.CourseQuestions;
		$scope.evaluation["TeacherQuestions"] = $scope.questions.TeacherQuestions;

		TemplateService.createTemplate($scope.evaluation).success(function(data, status, headers, config) {
			console.log("Template successfully created.");
			$location.path("/admin");
		}).error(function(data, status, headers, config) {
			console.log("Template creation error, status: " + status + ", Headers:");
			console.log(headers);

		});
	};
}]);