describe('TestCtrl', function(){
  	//Load-um alltaf evaluationApp module, inject-um $controller service i test fallid okkar, og notum hann til ad bua til instance af TestCtrl
  	beforeEach(module('evaluationApp'));

  	/*
	var ctrl, scope;
	// inject the $controller and $rootScope services
	// in the beforeEach block
	beforeEach(inject(function($controller, $rootScope) {
		// Create a new scope that's a child of the $rootScope
		scope = $rootScope.$new();
		// Create the controller
		ctrl = $controller('TestController', {
		  $scope: scope
		});
	})); */

	  it('should have a "username" variable with the value "Ragnar"', inject(function($controller) {
	    var scope = {},
	        ctrl = $controller('TestController', {$scope:scope});

	    expect(scope.username).toBe("Ragnar");
	  }));
});