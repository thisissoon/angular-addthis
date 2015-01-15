"use strict";
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   sn.addthis.e2e
 * @module sn.addthis.e2e
 * @author SOON_
 */
angular.module("sn.addthisToolbox.e2e", ["sn.addthis", "ngMockE2E"])
    .run([
        "$httpBackend",
        function ($httpBackend) {

            $httpBackend.whenGET(/partials\/.*/).passThrough();

        }
    ]);
