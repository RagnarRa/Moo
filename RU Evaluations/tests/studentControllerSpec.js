describe('StudentController', function(){
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
		ctrl = $controller('StudentController', {
		  $scope: scope
		});
	})); 


	beforeEach(inject(function($injector) {
		 //UserService = $injector.get("UserService");
	     // Set up the mock http service responses
	     $httpBackend = $injector.get('$httpBackend');
	     // backend definition common for all tests
	     authRequestHandler = $httpBackend.when('GET', 'http://dispatch.ru.is/demo/api/v1/my/evaluations')
	                            .respond(["data"], null); //.respond(data, headers);
   	}));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it("gets back data and sets the evaluations thing to said data", function() {
  	$httpBackend.flush();
  	//Populate the scope with fake data
  	expect(scope.evaluations[0]).toBe("data");
  });
}); 