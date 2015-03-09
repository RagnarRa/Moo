angular.module("evaluationApp").controller("AnswerEvalController", ["$scope", "$location", "$routeParams", "TemplateService", function($scope, $location, $routeParams, TemplateService) {	
	$scope.evaluation = {};
	$scope.evaluationAnswers = []; 
	$scope.teachers = [];
	$scope.evalAnswers = []; 
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID;
	console.log("Course ID " + courseID + ", semester: " + semester + ", evalID: " + evalID); 

	TemplateService.getEvaluationForCourseByEvalID(courseID, semester, evalID).success(function(data) {
		console.log("RECEIVED EVALUATION: ");
		console.dir(data);
		$scope.evaluation = data; 
	}).success(function() {
		TemplateService.getTeachersForCourse(courseID, semester).success(function(data) {
			console.log("Course questions: ");
			console.dir($scope.evaluation.CourseQuestions);
			console.log("RECEIVED TEACHERS: ");
			console.dir(data);
			$scope.teachers = data; 
			//Buum til gagnagrindina

			/*
			for (var question in $scope.evaluation.CourseQuestions) {
				console.log("Question: ");
				console.dir(question);
				$scope.evalAnswers.push({ "QuestionID" : question.ID, "Value" : ""});
			} */

			for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
				$scope.evalAnswers.push({ "QuestionID" : $scope.evaluation.CourseQuestions[i].ID, "Value" : ""});
			}
			/*
			for (var teacher in $scope.teachers) {
				for (question in $scope.evaluation.TeacherQuestions) {
					$scope.evalAnswers.push({ "QuestionID" : question.ID, "TeacherSSN" : teacher.SSN, "Value" : ""});
				}
			}*/

			for (i = 0; i < $scope.teachers.length; i++) {
				for (var j = 0; j < $scope.evaluation.TeacherQuestions.length; j++) {
					$scope.evalAnswers.push({"QuestionID" : $scope.evaluation.TeacherQuestions[j].ID, "TeacherSSN" : $scope.teachers[i].SSN, "Value" : ""});
				}
			}

			console.log("GAGNAGRIND: ");
			console.dir($scope.evalAnswers);
		});
	});
}]);