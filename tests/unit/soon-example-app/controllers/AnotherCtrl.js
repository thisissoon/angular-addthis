"use strict";

describe("AnotherCtrl", function (){

    var scope;

    beforeEach(function(){
        module("snExampleApp");
    });

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();

        $controller("AnotherCtrl", {
            $scope: scope
        });

    }));

    it("should have a variable bar which equals 456", function (){
        expect(scope.bar).toBe(456);
    });


});
