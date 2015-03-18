describe('CreateEvalController', function(){
  	//Load-um alltaf evaluationApp module, inject-um $controller service i test fallid okkar, og notum hann til ad bua til instance af LoginController
  	beforeEach(module('evaluationApp'));

  	
	var ctrl, scope, $httpBackend, authRequestHandler, UserService, location;
	// inject the $controller and $rootScope services
	// in the beforeEach block
	beforeEach(inject(function($controller, $rootScope, _UserService_, $location) {
		location = $location;

		UserService = _UserService_;
		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();

		// Create the controller
		ctrl = $controller('CreateEvalController', {
		  $scope: scope
		});
	})); 


	beforeEach(inject(function($injector) {
		 //UserService = $injector.get("UserService");
	     // Set up the mock http service responses
	     $httpBackend = $injector.get('$httpBackend');
	     // backend definition common for all tests
	     authRequestHandler = $httpBackend.when('POST', 'http://dispatch.ru.is/demo/api/v1/evaluationtemplates')
	                            .respond(null, null); //.respond(data, headers);
   	}));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it("expect the controller's properties to be defined", function() {
  	//Populate the scope with fake data
	scope.courseQuestionType = "text";
	expect(scope.questions).toBeDefined();
	expect(scope.questions.CourseQuestions).toBeDefined();
	expect(scope.questions.TeacherQuestions).toBeDefined();
	expect(scope.teacherQuestionType).toBeDefined();
	expect(scope.teacherQuestionType).toBeDefined();
  });

  it("should call location.path with admin after creating an evaluation", function() {
  	spyOn(location, 'path'); 
  	var testEval = { "CourseQuestions" : [], "TeacherQuestions" : [] };  
  	scope.createEval(testEval);
  	$httpBackend.flush();
  	expect(location.path).toHaveBeenCalledWith('/admin');
  });


    it('should NOT call location.path with admin after creating an evaluation', function() {
        authRequestHandler.respond(401, '');
        spyOn(location, 'path');
        var testEval = { "CourseQuestions" : [], "TeacherQuestions" : [] };
        scope.createEval(testEval);
        $httpBackend.flush();
        expect(location.path).not.toHaveBeenCalledWith('/admin');
    });

  describe("CourseQuestions", function() {
  	it("should add question to array with correct index", function() {
	  	//Populate the scope with fake data
		scope.courseQuestionType = "text";
		scope.addQuestion(0);
		expect(scope.questions.CourseQuestions[0].Index).toBe(0);
		scope.addQuestion(0);
		expect(scope.questions.CourseQuestions[1].Index).toBe(1);
  	});

  	it("should have type 'text' when courseQuestionType is text", function() {
  		scope.courseQuestionType = "text";
		scope.addQuestion(0);
		expect(scope.questions.CourseQuestions[0].Type).toBe("text");
  	});

  	it("should have type 'single' when courseQuestionType is single", function() {
  		scope.courseQuestionType = "single";
		scope.addQuestion(0);
		expect(scope.questions.CourseQuestions[0].Type).toBe("single");
  	});

  	it("should have type 'multiple' when courseQuestionType is multiple", function() {
  		scope.courseQuestionType = "multiple";
		scope.addQuestion(0);
		expect(scope.questions.CourseQuestions[0].Type).toBe("multiple");
  	});
  });

  describe("TeacherQuestions", function() {
  	it("should add question to array with correct index", function() {
	  	//Populate the scope with fake data
		scope.teacherQuestionType = "text";
		scope.addQuestion(1);
		expect(scope.questions.TeacherQuestions[0].Index).toBe(0);
		scope.addQuestion(1);
		expect(scope.questions.TeacherQuestions[1].Index).toBe(1);
  	});

  	it("should have type 'text' when teacherQuestionType is text", function() {
  		scope.teacherQuestionType = "text";
		scope.addQuestion(1);
		expect(scope.questions.TeacherQuestions[0].Type).toBe("text");
  	});

  	it("should have type 'single' when teacherQuestionType is single", function() {
  		scope.teacherQuestionType = "single";
		scope.addQuestion(1);
		expect(scope.questions.TeacherQuestions[0].Type).toBe("single");
  	});

  	it("should have type 'multiple' when teacherQuestionType is multiple", function() {
  		scope.teacherQuestionType = "multiple";
		scope.addQuestion(1);
		expect(scope.questions.TeacherQuestions[0].Type).toBe("multiple");
  	});
  });  

  describe("CourseAnswers", function() {
  	it("should add an answer to the array", function() {
  		scope.addQuestion(0);
		scope.addAnswer(0, 0);
		expect(scope.questions.CourseQuestions[0]["Answers"].length).toBe(1);
  	});
  });

  describe("TeacherAnswers", function() {
  	it("should add an answer to the array", function() {
  		scope.addQuestion(1);
		scope.addAnswer(0, 1);
		expect(scope.questions.TeacherQuestions[0]["Answers"].length).toBe(1);
  	});
  });

    describe("Evaluation form validation check", function() {
        var evaluation;

        beforeEach(inject(function($injector) {
            evaluation = {
                Title       : "Title text",
                IntroText   : "IntroText text",
                TitleEN     : "TitleEN text",
                IntroTextEN : "IntroTextEN text",
                questions   :{
                    CourseQuestions:{Text: "stuff", TextEN: "stuff"},
                    TeacherQuestions:{Text: "stuff", TextEN: "stuff"}
                }
            };

        }));
        it("evaluation should not be defined", function () {

            expect(scope.validateSubmitButton()).toBe(false);
        });

        it("should not allow an empty title", function () {
            evaluation ="";
            evaluation.Title= "";
            expect(scope.validateSubmitButton(evaluation)).toBe(false);
        });

        it("should not validate without a course question", function () {
            var evaluation = {
                Title:       "Title text",
                IntroText:   "IntroText text",
                TitleEN:     "TitleEN text",
                IntroTextEN: "IntroTextEN text"
            };


            expect(scope.validateSubmitButton(evaluation)).toBe(false);
        });

        it("should not validate a form if the course question is invalid", function () {
            var evaluation = {
                Title:       "Title text",
                IntroText:   "IntroText text",
                TitleEN:     "TitleEN text",
                IntroTextEN: "IntroTextEN text"
            };
            scope.questions.CourseQuestions = [];
            scope.questions.CourseQuestions.push({
                Text   : "",
                TextEN : "stuff"
            });

            expect(scope.validateSubmitButton(evaluation)).toBe(false);
        });

        it("should not validate a form if a teacher question is invalid", function () {
            var evaluation = {Title: "Title text", IntroText: "IntroText text", TitleEN: "TitleEN text", IntroTextEN: "IntroTextEN text"};
            scope.questions.CourseQuestions = [];
            scope.questions.CourseQuestions.push({Text: "stuff", TextEN: "stuff"});
            scope.questions.TeacherQuestions = [];
            scope.questions.TeacherQuestions.push({Text: "stuff", TextEN: ""});

            expect(scope.validateSubmitButton(evaluation)).toBe(false);
        });
        it("should validate a form if a teacher question is valid", function () {
            var evaluation = {Title: "Title text", IntroText: "IntroText text", TitleEN: "TitleEN text", IntroTextEN: "IntroTextEN text"};
            scope.questions.CourseQuestions = [];
            scope.questions.CourseQuestions.push({Text : "stuff", TextEN : "stuff"});
            scope.questions.TeacherQuestions = [];
            scope.questions.TeacherQuestions.push({Text   : "stuff", TextEN : "stuff"});
            expect(scope.validateSubmitButton(evaluation)).toBe(true);
        });

        it("should validate a filled out form with one valid course question", function () {
            var evaluation = {Title: "Title text", IntroText: "IntroText text", TitleEN: "TitleEN text", IntroTextEN: "IntroTextEN text"};
            scope.questions.CourseQuestions = [];
            scope.questions.CourseQuestions.push({
                Text   : "stuff",
                TextEN : "stuff"
                });

            expect(scope.validateSubmitButton(evaluation)).toBe(true);
        });
    });

    describe("Delete a question from a array of questions", function() {
        beforeEach(inject(function($injector) {
            scope.questions.CourseQuestions = [];
            scope.questions.CourseQuestions.push({Index: 3, TextEN: "item 3"});
            scope.questions.CourseQuestions.push({Index: 2, TextEN: "item 2"});
            scope.questions.CourseQuestions.push({Index: 1, TextEN: "item 1"});
            scope.questions.CourseQuestions.push({Index: 0, TextEN: "item 0"});

        }));
        it("should delete one question", function () {

            expect(scope.deleteQuestion(scope.questions.CourseQuestions, 2)).toBe(true);
            expect(scope.questions.CourseQuestions.length).toBe(3);
            expect(scope.questions.CourseQuestions[1].Index).toBe(1);
        });
        it("should NOT delete a question which does not exist", function () {
            expect(scope.deleteQuestion(scope.questions.CourseQuestions, 8)).toBe(false);
            expect(scope.questions.CourseQuestions.length).toBe(4);
        });
    });
}); 