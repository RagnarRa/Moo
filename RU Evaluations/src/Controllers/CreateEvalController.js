angular.module("evaluationApp").controller("CreateEvalController", ["$scope", "$location", "UserService", "TemplateService", function($scope, $location, UserService, TemplateService) {	
	$scope.questions = { "CourseQuestions" : [], "TeacherQuestions" : []};
	$scope.courseQuestionType = "text";
	$scope.teacherQuestionType= "text";

	//types: Course question (0), Teacher Question (1)
	$scope.addQuestion = function(type) {
		if (type === 0) { //Course
			if ($scope.courseQuestionType !== "text") { //Need to add an answers property (and give the user a chance to add answers)..
				//Indexed so we can add answers to it from the view.. where we lose indexing by using filters.
				$scope.questions.CourseQuestions.push({ "Index" : $scope.questions.CourseQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.courseQuestionType, "Answers" : []});
			}
			else {
				$scope.questions.CourseQuestions.push({ "Index" : $scope.questions.CourseQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.courseQuestionType});
			}
		}

		else if (type === 1) { //Teacher
			if ($scope.teacherQuestionType !== "text") { //Need to add an answers property (and give the user a chance to add answers)..
				//Indexed so we can add answers to it from the view.. where we lose indexing by using filters.
				$scope.questions.TeacherQuestions.push({ "Index" : $scope.questions.TeacherQuestions.length, "Text" : "", "TextEN" : "", "ImageURL" : "", "Type" : $scope.teacherQuestionType, "Answers" : []});
			}
			else {
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
			$location.path("/admin");
		}).error(function(data, status, headers, config) {
			console.log("Template creation error, status: " + status + ", Headers:");
			console.log(headers);
		});
	};

    //removes an element with a specific ID
    $scope.deleteQuestion = function(arr, id){

        var index = -1, i, obj;
        for(i = 0; i < arr.length; i++){
            if (arr[i].Index === id ){
                index = i;
                break;
            }
        }
        if (index === -1)
        {
            return false;
        }
        obj = arr[index];
        return (obj.Index === arr.splice(index, 1)[0].Index); //check if the splice was successful
    };

    //checks if a answer is valid
    $scope.checkAnswers = function(arr){
        var i;
        if (arr.Answers === undefined){
            return true;  //it's valid to have no answers
        }

        for(i = 0; i < arr.Answers.length; i++){
            if( ( !$scope.isText(arr.Answers[i].Text)   ) ||
                ( !$scope.isText(arr.Answers[i].TextEN) )){
                return false;  //icelandic and english text required.
            }
        }
        return true;
    };

    $scope.isText = function(text){
        if (text === undefined || text.length < 1){
            return false;
        }
        return true;
    };

    $scope.validateSubmitButton = function(evaluation){
        var i;
        $scope.errorMsg = "";
        if (evaluation === undefined){

            return false;
        }

        if( ( !$scope.isText(evaluation.Title)       ) ||
            ( !$scope.isText(evaluation.IntroText)   ) ||
            ( !$scope.isText(evaluation.TitleEN)     ) ||
            ( !$scope.isText(evaluation.IntroTextEN) ) ){
            $scope.errorMsg = "Title (IS), Title (EN), Intro text (IS) and Intro text (EN) are required";
            return false;
        }
        //now the sub-questions
        else if ( $scope.questions.CourseQuestions === undefined ||
            $scope.questions.CourseQuestions.length < 1){
            $scope.errorMsg = "At least one Course question is required";
            return false; //you have no use for a course template without any questions
        }

        for(i = 0; i < $scope.questions.CourseQuestions.length ; i++){
            if( ( !$scope.isText($scope.questions.CourseQuestions[i].Text)   ) ||
                ( !$scope.isText($scope.questions.CourseQuestions[i].TextEN) )  ){
                $scope.errorMsg = "All Course questions need to have a question in icelandic and english";
                return false;
            }
            if(!$scope.checkAnswers($scope.questions.CourseQuestions[i])){
                $scope.errorMsg = "All answers need to have a text in icelandic and english";
                return false;
            }
        }

        if($scope.questions.TeacherQuestions !== undefined && $scope.questions.TeacherQuestions.length > 0)
        {
            //because we have some teacher questions we need to validate them
            for(i = 0; i < $scope.questions.TeacherQuestions.length ; i++){
                if( ( !$scope.isText($scope.questions.TeacherQuestions[i].Text)   ) ||
                    ( !$scope.isText($scope.questions.TeacherQuestions[i].TextEN) )  ){
                    $scope.errorMsg = "All Teacher questions need to have a question in icelandic and english";
                    return false;
                }
            }
        }
        return true;
    };

}]);