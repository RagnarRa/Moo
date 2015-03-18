angular.module("evaluationApp").controller("EvalResultsController", ["$scope", "$location", "$routeParams", "UserService", "TemplateService", function($scope, $location, $routeParams, UserService, TemplateService) {
	var courseID = $routeParams.courseID, semester = $routeParams.semester, evalID = $routeParams.evalID; 
	var evaluationResults = [];
	$scope.templateTitle = "";
	$scope.courseName = "";
	$scope.courseEvaluationResult = {};
	$scope.teachers = []; 

	$scope.teacherQuestions = []; //{ "TeacherName" : "", Questions : [] }
	$scope.courseQuestions = [];
	$scope.statsForTextQuestions = []; // { "Text" : "", "PercentAnswered" : 0, "PercentUnanswered" : 0}
    
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

				populateCharts();
			});
	}); 

	function populateCharts() {
		//Buum til chart fyrir svarhlutfall a textaspurningum..
		//Fara i gegnum.. courseResult.Questions.. ef Type === "Text".. tha forum vid i gegnum allt i TextResults.. 
		//Naum i TextResults.length..
		//Forum i gegn og teljum null.. 
		
		var i = 0, j = 0, numAnswers = 0, numUnanswered = 0, percentUnanswered = 0, percentAnswered = 0;  

		for (i = 0; i < $scope.courseEvaluationResult.Questions.length; i++) {
			if ($scope.courseEvaluationResult.Questions[i].Type === "text") {
				numAnswers = $scope.courseEvaluationResult.Questions[i].TextResults.length;
				numUnanswered = 0; 
				
				for (j = 0; j < $scope.courseEvaluationResult.Questions[i].TextResults.length; j++) {
					if ($scope.courseEvaluationResult.Questions[i].TextResults[j] === null || $scope.courseEvaluationResult.Questions[i].TextResults[j] === "") {
						numUnanswered++; 
					}
				}

				percentUnanswered = Math.floor((numUnanswered / numAnswers) * 100);
				percentAnswered = 100 - percentUnanswered;
				$scope.statsForTextQuestions.push({ "Text" : $scope.courseEvaluationResult.Questions[i].Text, "PercentAnswered" : percentAnswered, "PercentUnanswered" : percentUnanswered });
				
			}
		}

		console.log("STATS: ");
		console.log($scope.statsForTextQuestions);

		$scope.labels = [];
		$scope.series = ['Svarað', 'Ósvarað'];
		$scope.data = [[], []]; 

		for (i = 0; i < $scope.statsForTextQuestions.length; i++) {
			$scope.labels.push(i+1);
			$scope.data[0].push($scope.statsForTextQuestions[i].PercentAnswered);
			$scope.data[1].push($scope.statsForTextQuestions[i].PercentUnanswered);
		}

		/*
		$scope.labels = ['[1]', '[2]', '[3]', '[4]', '[5]', '[6]', '[7]'];

	  	$scope.data = [
	    	[65, 59, 80, 81, 56, 55, 40],
	    	[28, 48, 40, 19, 86, 27, 90]
	  	]; */
  	}
}]);