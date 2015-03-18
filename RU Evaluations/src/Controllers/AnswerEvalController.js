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

    $scope.validateSubmitButton = function(){

        //we want to allow only one question answered, and it does
        //not matter whether itðs a courseAnswer or a teacherAnswer
        //if (text === undefined || text.length < 1){
        for (var i = 0; i < $scope.courseAnswers.length; i++) {
            if ( ($scope.courseAnswers[i].Value !== undefined ) && ($scope.courseAnswers[i].Value.length > 0) ){
                return true;
            }
        }
       for (var SSN in $scope.teacherAnswers) {
            for (i = 0; i < $scope.teacherAnswers[SSN].length; i++) {
                if (($scope.teacherAnswers[SSN][i].Value !== undefined) && ( $scope.teacherAnswers[SSN][i].Value.length > 0) ){
                    return true;
                }
            }
        }
        return false;
    };
}]);