"use strict";

describe("ExampleFormCtrl", function (){

    var scope;

    beforeEach(function(){
        module("snExampleApp");
    });

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();

        $controller("ExampleFormCtrl", {
            $scope: scope
        });

    }));

    it("should have a variable user which is an Object", function (){
        expect(scope.user).toEqual( jasmine.any(Object) );
    });

    it("should save user object on submit to $scope.added object", function (){
        scope.user = { name: "foo" };
        scope.form = { $valid: true };
        scope.submit();
        expect(scope.added.user.name).toEqual( "foo" );
    });

    it("should delete added object from scope on submit if form is invalid", function (){
        scope.form = { $valid: false };
        scope.submit();
        expect(scope.added).not.toBeDefined();
    });


});
