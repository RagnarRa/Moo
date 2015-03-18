describe('EvalResultsController', function() {
	beforeEach(module('evaluationApp'));

	var ctrl, scope, $httpBackend, UserService, location;

	beforeEach(inject(function($controller, $rootScope) {
		backendUrl = 'http://dispatch.ru.is/h11/api/v1/';

		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();

		// Create the controller
		ctrl = $controller('EvalResultsController', {
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
		$httpBackend.when('GET', 'http://dispatch.ru.is/h11/api/v1/courses/T-427-WEPO/20151/evaluations/1')
			.respond({'TemplateTitle' : "", 'Courses' : []}, null);
		$httpBackend.when('GET', 'http://dispatch.ru.is/h11/api/v1/courses/T-427-WEPO/20151/teachers')
			.respond('teachers', null);
		$httpBackend.when('GET', backendUrl + 'evaluations/1')
        	.respond({'TemplateTitle' : "", 'Courses' : []}, null);
	}));

	it("should receive evaluations", function() {

		
	});
});