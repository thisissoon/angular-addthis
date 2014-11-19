"use strict";

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe("snExampleApp", function() {

    browser.get("app/index.html#/");

    it("should automatically redirect to / when location hash/fragment is empty", function() {
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    describe("view1", function() {

        beforeEach(function() {
            browser.get("app/index.html#/");
        });


        it("should render home partial when user navigates to /", function() {
            expect(element.all(by.css("ng-view h1")).first().getText()).toEqual("Home");
        });

      });


    describe("view2", function() {

        beforeEach(function() {
            browser.get("app/index.html#/another");
        });


        it("should render another view when user navigates to /another", function() {
            expect(element.all(by.css("ng-view h1")).first().getText()).toEqual("Another view");
        });

    });

    describe("view3", function() {

        beforeEach(function() {
            browser.get("app/index.html#/example-form");
        });


        it("should render exmaple form view when user navigates to /example-form", function() {
            expect(element.all(by.css("ng-view h1")).first().getText()).toEqual("Example Form");
        });

        it("should fill in and submit form", function() {
            element(by.model('user.name')).sendKeys("foo");
            element(by.model('user.email')).sendKeys("foo@bar.com");
            element(by.model('user.password')).sendKeys("1234");
            element(by.model('user.check')).click();
            element(by.id('submit')).click();

            expect(element(by.binding('added')).getText()).toEqual('User foo was successfully added');
        });

    });

});
