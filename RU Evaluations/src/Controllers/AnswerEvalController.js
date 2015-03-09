angular.module("evaluationApp").controller("AnswerEvalController", ["$scope", "$location", "$routeParams", "TemplateService", function($scope, $location, $routeParams, TemplateService) {	
	$scope.evaluation = {};
	$scope.evaluationAnswers = []; 
	$scope.teachers = [];
	$scope.courseAnswers = [];
	$scope.teacherAnswers = {};
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

			for (var i = 0; i < $scope.teachers.length; i++) {
				$scope.teacherAnswers[$scope.teachers[i].SSN] = [];
			}

			/*
			for (var question in $scope.evaluation.CourseQuestions) {
				console.log("Question: ");
				console.dir(question);
				$scope.evalAnswers.push({ "QuestionID" : question.ID, "Value" : ""});
			} 

			for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
				$scope.evalAnswers.push({ "QuestionID" : $scope.evaluation.CourseQuestions[i].ID, "Value" : "", "QuestionIndex" : i, "Type" : "CourseQuestion"});
			}
		
			for (var teacher in $scope.teachers) {
				for (question in $scope.evaluation.TeacherQuestions) {
					$scope.evalAnswers.push({ "QuestionID" : question.ID, "TeacherSSN" : teacher.SSN, "Value" : ""});
				}
			}

			for (i = 0; i < $scope.teachers.length; i++) {
				for (var j = 0; j < $scope.evaluation.TeacherQuestions.length; j++) {
					$scope.evalAnswers.push({"QuestionID" : $scope.evaluation.TeacherQuestions[j].ID, "TeacherSSN" : $scope.teachers[i].SSN, "Value" : "", "QuestionIndex" : j, "Type" : "TeacherQuestion", "TeacherIndex" : i});
				}
			}

			console.log("GAGNAGRIND: ");
			console.dir($scope.evalAnswers); */
		});
	});


	$scope.saveEval = function() {
		var allAnswers = [];
		for (var i = 0; i < $scope.courseAnswers.length; i++) {
			allAnswers.push({ "QuestionID" : $scope.courseAnswers[i].QuestionID, "Value" : $scope.courseAnswers[i].Value });
		}

		for (var SSN in $scope.teacherAnswers) {
			for (i = 0; i < $scope.teacherAnswers[SSN].length; i++) {
				allAnswers.push({ "TeacherSSN" : SSN, "QuestionID" : $scope.teacherAnswers[SSN][i].QuestionID, "Value" : $scope.teacherAnswers[SSN][i].Value });
			}
		}

		console.log("All answers");
		console.dir(allAnswers); 

		TemplateService.saveAnswersToEvaluationInCourse(courseID, semester, evalID, allAnswers).success(function(data) {
			console.log("Answers to evaluation successfully saved..");
			$location.path("/student");
		});
	};
}]);