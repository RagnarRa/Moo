describe('AnswerEvalController', function(){
	//Load-um alltaf evaluationApp module, inject-um $controller service i test fallid okkar, og notum hann til ad bua til instance af LoginController
	beforeEach(module('evaluationApp'));

	var ctr, scope, $httpBackend, authRequestHandler, UserService, location;

	beforeEach(inject(function($controller, $rootScope, _UserService_, $location) {
		location = $location;

		UserService = _UserService_;
		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();

		// Create the controller
		ctrl = $controller('AnswerEvalController', {
			$scope: scope,
			$routeParams: {	courseID: 'T-427-WEPO',
							semester: '20151',
							evalID: 1}
		});
	}));

	beforeEach(inject(function($injector) {
		// Set up the mock http service responses
		$httpBackend = $injector.get('$httpBackend');
		// backend definition common for all tests
		$httpBackend.when('GET', 'http://dispatch.ru.is/demo/api/v1/courses/T-427-WEPO/20151/evaluations/1')
			.respond('evaluation', null);
		$httpBackend.when('GET', 'http://dispatch.ru.is/demo/api/v1/courses/T-427-WEPO/20151/teachers')
			.respond('teachers', null);
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should call location.path with student after answering an evaluation", function() {
		$httpBackend.when('POST', 'http://dispatch.ru.is/demo/api/v1/courses/T-427-WEPO/20151/evaluations/1')
			.respond(null, null);
		spyOn(location, 'path');
		
		scope.saveEval();
		$httpBackend.flush();
		expect(location.path).toHaveBeenCalledWith('/student');
	});
});