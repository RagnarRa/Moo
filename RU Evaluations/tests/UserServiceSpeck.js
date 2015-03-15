describe("UserService", function(){

    beforeEach(module("evaluationApp"));

    var service;

    beforeEach(inject(function(UserService){
        service = UserService;
    }));

    describe("setToken and getToken", function(){
        it("should be 'aNewvalue' ", function(){
            service.setToken('aNewvalue');
            expect(service.getToken()).toBe("aNewvalue");
        });
    });
    describe("setUsername and getUsername", function(){
        it("should be 'aNewvalue' ", function(){
            service.setUsername('aNewvalue');
            expect(service.getUsername()).toBe("aNewvalue");
        });
    });
    describe("setRole and getRole", function(){
        it("should be 'aNewvalue' ", function(){
            service.setRole('aNewvalue');
            expect(service.getRole()).toBe("aNewvalue");
        });
    });
});