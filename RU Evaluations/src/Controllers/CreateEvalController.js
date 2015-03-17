angular.module("evaluationApp").controller("CreateEvalController", ["$scope", "$location", "UserService", "TemplateService", function($scope, $location, UserService, TemplateService) {	
	$scope.questions = { "CourseQuestions" : [], "TeacherQuestions" : []};
	$scope.courseQuestionType = "text";
	$scope.teacherQuestionType= "text";

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

    $scope.isText = function(text){
        if (text === undefined || text.length < 1){
            return false;
        }
        return true;
    };

    $scope.validateSubmitButton = function(evaluation){
        var i;

        if (evaluation === undefined){
            return false;
        }

        if( ( !$scope.isText(evaluation.Title)       ) ||
            ( !$scope.isText(evaluation.IntroText)   ) ||
            ( !$scope.isText(evaluation.TitleEN)     ) ||
            ( !$scope.isText(evaluation.IntroTextEN) ) ){
            return false;  //Title, TitleEN, IntroText and IntroTextEN required
        }
        //now the sub-questions
        else if ( $scope.questions.CourseQuestions === undefined ||
            $scope.questions.CourseQuestions.length < 1){
            return false; //you have no use for a course template without any questions
        }

        for(i = 0; i < $scope.questions.CourseQuestions.length ; i++){
            if( ( !$scope.isText($scope.questions.CourseQuestions[i].Text)   ) ||
                ( !$scope.isText($scope.questions.CourseQuestions[i].TextEN) )  ){
                return false;  //Every question needs to have a Text and TextEN
            }
        }

        if($scope.questions.TeacherQuestions !== undefined && $scope.questions.TeacherQuestions.length > 0)
        {
            //because we have some teacher questions we need to validate them
            for(i = 0; i < $scope.questions.TeacherQuestions.length ; i++){
                if( ( !$scope.isText($scope.questions.TeacherQuestions[i].Text)   ) ||
                    ( !$scope.isText($scope.questions.TeacherQuestions[i].TextEN) )  ){
                    return false;  //Every question needs to have a Text and TextEN
                }
            }
        }

        return true;
    };
}]);