"use strict";
/**
 * Controller for '/another' view of snExampleApp.
 * @class  AnotherCtrl
 * @module snExampleApp
 * @author SOON_
 */
angular.module("snExampleApp").controller("AnotherCtrl", [
    "$scope",
    /**
     * @constructor
     * @param {Object} $scope
     */
    function ($scope) {

        /**
         * This is a variable in our view
         * @property bar
         * @type {Number}
         */
        $scope.bar = 456;

    }

]);
