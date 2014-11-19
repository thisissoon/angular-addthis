"use strict";
/**
 * Configuration for snExampleApp dependencies are set here.
 * @module snExampleApp
 * @author SOON_
 */
angular.module("snExampleApp").config([
    "$routeProvider",
    /**
     * @constructor
     * @param {Service} $routeProvider
     */
    function ($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "partials/home.html",
                controller: "HomeCtrl"
            })
            .when("/another", {
                templateUrl: "partials/another-view.html",
                controller: "AnotherCtrl"
            })
            .when("/example-form", {
                templateUrl: "partials/example-form.html",
                controller: "ExampleFormCtrl"
            })
            .otherwise({
                redirectTo: "/"
            });

    }
]);
