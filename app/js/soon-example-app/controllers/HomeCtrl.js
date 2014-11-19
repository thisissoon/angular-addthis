"use strict";
/**
 * Controller for homepage view of snExampleApp.
 * @class  HomeCtrl
 * @module snExampleApp
 * @author SOON_
 */
angular.module("snExampleApp").controller("HomeCtrl", [
    "$scope",
    /**
     * @constructor
     * @param {Object} $scope
     */
    function ($scope) {

        /**
         * This is a variable in our view
         * @property foo
         * @type {Number}
         */
        $scope.foo = 123;

    }

]);
