describe('LoginController', function(){
  	//Load-um alltaf evaluationApp module, inject-um $controller service i test fallid okkar, og notum hann til ad bua til instance af LoginController
  	beforeEach(module('evaluationApp'));

  	
	var ctrl, scope;
	// inject the $controller and $rootScope services
	// in the beforeEach block
	beforeEach(inject(function($controller, $rootScope) {
		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();
		// Create the controller
		ctrl = $controller('LoginController', {
		  $scope: scope
		});
	})); 

	  it('should have a username and a token defined', inject(function($controller) {
	    expect(scope.username).toBeDefined();
	    expect(scope.token).toBeDefined();
	  }));
}); 