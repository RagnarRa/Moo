describe('AdminController', function() {
    beforeEach(module('evaluationApp'));

    var ctrl, scope, location, templateService, $httpBackend, authRequestHandler, backendUrl;

    beforeEach(inject(function ($controller, $rootScope, $location, _TemplateService_) {

        scope           = $rootScope.$new();
        location        = $location;
        templateService = _TemplateService_;
        backendUrl      = 'http://dispatch.ru.is/demo/api/v1/';

        // Create the controller
        ctrl = $controller('AdminController', {
            $scope: scope,
            TemplateService: templateService
        });
    }));

    describe('createEval and addTemplate', function() {
        beforeEach(inject(function ($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');
            // backend definition common for all tests
            authRequestHandler = $httpBackend.when('GET', backendUrl + 'evaluationtemplates')
                .respond(null, null); //.respond(data, headers);
            $httpBackend.when('GET', backendUrl + 'evaluations')
                .respond(null, null); //.respond(data, headers);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("*should call /createeval ", function () {
            spyOn(location, 'path');
            scope.createEval();
            $httpBackend.flush();
            expect(location.path).toHaveBeenCalledWith('/createeval');
        });

        it("should fail createeval ", function () {
            spyOn(location, 'path');
            authRequestHandler.respond(401, 'status', 'headers', 'config');
            scope.createEval();
            $httpBackend.flush();
            expect(location.path).toHaveBeenCalledWith('/createeval');
        });

        it("should opens an evaluation for students ", function () {
            authRequestHandler = $httpBackend.when('POST', backendUrl + 'evaluations')
                .respond(null, null); //.respond(data, headers);
            scope.startDate = new Date();
            scope.endDate = new Date();
            scope.endDate.setDate(scope.endDate.getDate() + 1);
            scope.templateID = 1;
            scope.addTemplate();
            $httpBackend.flush();
            expect(scope.resultMsg).toBe('Evaluations successfully added');
        });

        it("should fail to open an evaluation for students ", function () {
            authRequestHandler = $httpBackend.when('POST', backendUrl + 'evaluations')
                .respond(null, null); //.respond(data, headers);
            authRequestHandler.respond(401, 'status', 'headers', 'config');
            scope.startDate = new Date();
            scope.endDate = new Date();
            scope.endDate.setDate(scope.endDate.getDate() + 1);
            scope.templateID = 1;
            scope.addTemplate();
            $httpBackend.flush();
            expect(scope.resultMsg).toBe('Error, unable to add evaluation');
        });
    });

});