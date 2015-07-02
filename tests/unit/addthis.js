"use strict";

describe("directive: snAddthisToolbox", function() {
    var element, scope, isolatedScope, timeout, _window, addthisEl, spy;

    beforeEach(module("sn.addthis"));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope.$new();

        _window = $injector.get("$window");

        _window.addthis = {
            init: function(){},
            toolbox: function(){}
        }

        timeout = $injector.get("$timeout");

        element =
            "<sn-addthis-toolbox data-url=\"http://www.my-domain.com\" data-title=\"My Website\" data-description=\"foo bar\">" +
                "<a href class=\"addthis_button_facebook\">Facebook</a>" +
                "<a href class=\"addthis_button_twitter\">Twitter</a>" +
            "</sn-addthis-toolbox>";

        element = $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.isolateScope();

        spy = spyOn(isolatedScope, "removeStockButtons")
        spy.and.callThrough();

    }));

    beforeEach(function(){
        for (var i = isolatedScope.checksLeft; i >= 0; i--) {
            timeout.flush();
        };
    });

    afterEach(function(){
        timeout.verifyNoPendingTasks();
    });

    describe("no existing config data", function() {

        it("should attach directive options to scope", function (){
            expect(isolatedScope.url).toEqual("http://www.my-domain.com");
            expect(isolatedScope.title).toEqual("My Website");
            expect(isolatedScope.description).toEqual("foo bar");
        });

        it("should attempt to remove stock addthis buttons", function (){
            expect(spy.calls.count()).toBe(10);
        });

    });

    describe("preserve existing config data", function() {

        beforeEach(inject(function ($rootScope, $compile, $injector) {

            _window.addthis_config = { id: 123 }

            element = $compile(element)(scope);
            scope.$digest();

            isolatedScope = element.isolateScope();

        }));

        beforeEach(function(){
            for (var i = isolatedScope.checksLeft; i >= 0; i--) {
                timeout.flush();
            };
        })

        afterEach(inject(function ($injector){
            timeout.verifyNoPendingTasks();
        }));


        it("should get existing addthis config from window", function (){
            expect(isolatedScope.config).toEqual(_window.addthis_config);
        });

   });

    describe("remove stock addthis buttons from DOM", function() {

        beforeEach(inject(function ($rootScope, $compile, $injector) {

            element =
                "<sn-addthis-toolbox>" +
                    "<div class=\"at-share-tbx-element\"></div>" +
                "</sn-addthis-toolbox>";

            element = $compile(element)(scope);
            scope.$digest();

            isolatedScope = element.isolateScope();

        }));

        afterEach(inject(function ($injector){
            timeout.verifyNoPendingTasks();
        }));


        it("should remove injected addthis DOM element from document", function (){
            timeout.flush();
            expect(isolatedScope.checksLeft).toBe(9)
            expect(angular.element(element).html()).not.toContain("at-share-tbx-element");
        });

    });

    describe("layers refresh", function() {

        beforeEach(inject(function ($rootScope, $compile, $injector) {

            spy = jasmine.createSpy("refresh");

            _window.addthis.layers = {
                refresh: spy
            }

            element = $compile(element)(scope);
            scope.$digest();

            isolatedScope = element.isolateScope();

        }));

        beforeEach(function(){
            for (var i = isolatedScope.checksLeft; i >= 0; i--) {
                timeout.flush();
            };
        })

        afterEach(inject(function ($injector){
            timeout.verifyNoPendingTasks();
        }));


        it("should refresh layers on init", function (){
            expect(spy).toHaveBeenCalled();
        });

   });


});

