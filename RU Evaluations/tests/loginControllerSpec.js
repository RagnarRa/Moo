describe('LoginController', function(){
  	//Load-um alltaf evaluationApp module, inject-um $controller service i test fallid okkar, og notum hann til ad bua til instance af LoginController
  	beforeEach(module('evaluationApp'));

  	
	var ctrl, scope, $httpBackend, authRequestHandler, UserService, location, httpData;
	// inject the $controller and $rootScope services
	// in the beforeEach block
	beforeEach(inject(function($controller, $rootScope, _UserService_, $location) {
		httpData = {"Token" : "abcd", "User" : { "Username" : "demo" }};

		location = $location;

		UserService = _UserService_;
		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();
		// Create the controller
		ctrl = $controller('LoginController', {
		  $scope: scope
		});
	})); 


	beforeEach(inject(function($injector) {
		 //UserService = $injector.get("UserService");
	     // Set up the mock http service responses
	     $httpBackend = $injector.get('$httpBackend');
	     // backend definition common for all tests
	     authRequestHandler = $httpBackend.when('POST', 'http://dispatch.ru.is/demo/api/v1/login')
	                            .respond({"Token" : "abcd", "User" : { "Username" : "demo" }}, null); //.respond(data, headers);
	     /*
	     // Get hold of a scope (i.e. the root scope)
	     $rootScope = $injector.get('$rootScope');
	     // The $controller service is used to create instances of controllers
	     var $controller = $injector.get('$controller');

	     createController = function() {
	       return $controller('MyController', {'$scope' : $rootScope });
	     }; */
   	}));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should have a username and a token defined', inject(function($controller) {
    expect(scope.username).toBeDefined();
    expect(scope.token).toBeDefined();
  }));

  it('should post to the login Url', function() {
     $httpBackend.expectPOST('http://dispatch.ru.is/demo/api/v1/login');
     scope.logIn();
     $httpBackend.flush(); //Take this otherwise async call, make it "reply"
   });

  it("should set the token to abcd and username to demo", function() {
  	scope.logIn();
  	$httpBackend.flush();
  	expect(UserService.getToken()).toBe("abcd");
  	expect(UserService.getUsername()).toBe("demo");
  });

  it("should call student when user is not admin", function() {
  	spyOn(location, 'path');    
  	scope.logIn();
  	$httpBackend.flush();
  	expect(location.path).toHaveBeenCalledWith('/student');
  });
  /*
  it("should call admin when user is admin", function() {
	authRequestHandler = $httpBackend.when('POST', 'http://dispatch.ru.is/demo/api/v1/login')
	                            .respond({"Token" : "abcd", "User" : { "Username" : "admin", "Role" : "admin" }}, null);
	spyOn(location, 'path');
	scope.logIn();
	$httpBackend.flush();
	expect(location.path).toHaveBeenCalledWith('/admin');	                            
  }); */
}); 