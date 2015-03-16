describe('AdminController', function() {
    beforeEach(module('evaluationApp'));

    var authRequestHandler, ctrl, scope, location, filter, UserService, TemplateService;

    beforeEach(inject(function ($controller, $rootScope, $location, $filter, _UserService_, _TemplateService_) {

        scope           = $rootScope.$new();
        location        = $location;
        filter          = $filter;
        UserService     = _UserService_;
        TemplateService = _TemplateService_;


        // Create the controller
        ctrl = $controller('AdminController', {
            $scope: scope
           /* $location: location*/
        });
    }));

    /*beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('POST', 'http://dispatch.ru.is/demo/api/v1/admin')
            .respond(null, null); //.respond(data, headers);
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });*/

    it("should call /createeval ", function() {
        spyOn(location, 'path');
        scope.createEval();
        expect(location.path).toHaveBeenCalledWith('/createeval');
    });

    it("should opens an evaluation for students ", function() {

        scope.startDate = new Date();
        scope.endDate = new Date();
        scope.endDate.setDate(scope.endDate.getDate() + 1);
        scope.templateID = 1 ;
        scope.addTemplate();
        expect(scope.successMsg).toBe('Evaluations successfully added');
    });



});