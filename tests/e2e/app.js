"use strict";
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   sn.addthisToolbox.e2e
 * @module sn.addthisToolbox.e2e
 * @author SOON_
 */
angular.module("sn.addthisToolbox.e2e", ["sn.addthisToolbox", "ngMockE2E"])
    .run([
        "$httpBackend",
        function ($httpBackend) {

            $httpBackend.whenGET(/partials\/.*/).passThrough();

        }
    ]);
