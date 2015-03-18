angular.module("evaluationApp").controller("EvalResultsController", ["$scope", "$location", "$routeParams", "UserService", "TemplateService", function($scope, $location, $routeParams, UserService, TemplateService) {
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID; 
	var evaluationResults = [];
	$scope.templateTitle = "";
	$scope.courseName = "";
	$scope.courseEvaluationResult = {};
	$scope.teachers = []; 

	$scope.teacherQuestions = []; //{ "TeacherName" : "", Questions : [] }
	$scope.courseQuestions = [];
    
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
			//Fill the object with the names of the teachers for easy access in the view
			TemplateService.getTeachersForCourse(courseID, semester).success(function(data) {
				console.log("Got the teachers..");
				console.log(data);
				$scope.teachers = data;
				var i = 0, j = 0;
				for (i = 0; i < $scope.courseEvaluationResult.Questions.length; i++) {
					if ($scope.courseEvaluationResult.Questions[i]["TeacherSSN"] !== null) {
						//Finnum nafn kennarans..
						for (j = 0; j < $scope.teachers.length; j++) {
							if ($scope.teachers[j]["SSN"] === $scope.courseEvaluationResult.Questions[i]["TeacherSSN"]) {
								$scope.courseEvaluationResult.Questions[i]["TeacherName"] = $scope.teachers[j]["FullName"];
								console.log($scope.courseEvaluationResult.Questions[i]["TeacherName"]);
								break;
							}
						} 
					}
				}

				var currTeacher = "";
				//Setjum upp gagnagrind fyrir view-id 
				for (var k = 0; k < $scope.courseEvaluationResult.Questions.length; k++) {
					if ($scope.courseEvaluationResult.Questions[k]["TeacherSSN"] !== null) {
						if (currTeacher != $scope.courseEvaluationResult.Questions[k]["TeacherName"]) {
							currTeacher = $scope.courseEvaluationResult.Questions[k]["TeacherName"]; 
							$scope.teacherQuestions.push({ "TeacherName" : $scope.courseEvaluationResult.Questions[k]["TeacherName"], Questions : [] });
							$scope.teacherQuestions[$scope.teacherQuestions.length - 1].Questions.push($scope.courseEvaluationResult.Questions[k]);
						}
						else {
							//Erum ad vinna med sama kennara og i sidustu itrun (their koma ordered)
							$scope.teacherQuestions[$scope.teacherQuestions.length - 1].Questions.push($scope.courseEvaluationResult.Questions[k]);	
						}
					}

					else { //Course question
						$scope.courseQuestions.push($scope.courseEvaluationResult.Questions[k]);
					}
				}

				console.log("Alright.. let's now post the evaluationresults with the teachers..");
				console.log($scope.courseEvaluationResult);
				console.log("Course questions:");
				console.log($scope.courseQuestions);
				console.log("Teacher questions:");
				console.log($scope.teacherQuestions);
			});
	}); 
}]);