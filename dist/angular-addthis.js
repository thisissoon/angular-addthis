/*! angular-addthis - v0.2.4 - 2016-05-31 */
"use strict";
/**
 * AddThis widget directive, Re-renders addthis buttons as angular changes
 * views in our app since the add this buttons only load by default on page
 * load and not when the DOM is updated. based on:
 * {@link http://stackoverflow.com/questions/15593039/angularjs-and-addthis-social-plugin}
 * @example
 *  Usage:
 *   <!-- 1. include `addthis_widget.js` in index page with async attribute -->
 *   <script src="//s7.addthis.com/js/300/addthis_widget.js#pubid={pubid}&async=1"></script>
 *
 *   <!-- 2. add "sn-addthis-toolbox" directive to a widget's toolbox div -->
 *   <div class="addthis_custom_sharing" sn-addthis-toolbox>
 *     ...       ^
 *   </div>
 *
 *   <!-- 3. add classes to anchor links to attach the link to a service -->
 *   <!-- ['addthis_button_google_plusone_share','addthis_button_twitter','addthis_button_facebook'] -->
 *   <a href class="addthis_button_google_plusone_share">Share on Google+</a>
 *
 * @main   sn.addthis
 * @module sn.addthis
 * @author SOON_
 */
angular.module("sn.addthis", [])

/**
 * angular directive which initialise addthis toolbox
 * @example
 *     <sn-addthis-toolbox class="addthis_custom_sharing">
 *         <a href class="addthis_button_facebook">Facebook</a>
 *     </sn-addthis-toolbox>
 * @class  snAddthisToolbox
 * @module sn.addthis
 * @author SOON_
 */
.directive("snAddthisToolbox", [
    "$document",
    "$timeout",
    "$window",
    "$location",
    /**
     * @constructor
     * @param {Service} $document
     * @param {Service} $timeout
     * @param {Service} $window
     * @param {Service} $location
     */
    function ($document, $timeout, $window, $location) {
        return {
            restrict: "EAC",
            replace: false,
            scope: {
                share: "=?"
            },
            link: function ($scope, $element) {

                $scope.share = $scope.share ? $scope.share : {};

                /**
                 * Number of times to check for stock addthis buttons
                 * @property checksLeft
                 * @type     {Number}
                 * @default  10
                 */
                $scope.checksLeft = 10;

                /**
                 * {@link http://support.addthis.com/customer/portal/articles/1337994-the-addthis_config-variable}
                 * @property config
                 * @type     {Object}
                 */
                $scope.config = $window.addthis_config ? $window.addthis_config : {}; // jshint ignore:line

                /**
                 * Removes the stock addthis buttons
                 * @method removeStockButtons
                 */
                $scope.removeStockButtons = function removeStockButtons() {
                    if ($scope.checksLeft > 0){
                        $scope.checksLeft--;

                        var addthisEl = $element[0].getElementsByClassName("at-share-tbx-element")[0];

                        if (addthisEl){
                            addthisEl.parentNode.removeChild(addthisEl);
                        } else {
                            $timeout.cancel($scope.timer);
                            $scope.timer = $timeout($scope.removeStockButtons, 500);
                        }
                    }
                };

                /**
                 * Initialise the addthis buttons on directive load
                 * @method init
                 */
                $scope.init = function init(){
                    // Use location service to get url if not set
                    if (!$scope.share.url) {
                        $scope.share.url = $location.absUrl();

                        // Fix addthis share link for root url
                        if ($location.path() === "/") {
                            $scope.share.url = $scope.share.url + "#/";
                        }
                    }

                    // Default share title from page title
                    if (!$scope.share.title) {
                        var titleElement = $document[0].querySelector("title");
                        $scope.share.title = titleElement ? titleElement.innerHTML : "";
                    }
                    // Default share description from page title
                    if (!$scope.share.description) {
                        var descElement = $document[0].querySelector("meta[name='description']");
                        $scope.share.description = descElement ? descElement.getAttribute("content") : "";
                    }

                    $window.addthis.init();

                    if ($window.addthis.layers && $window.addthis.layers.refresh) {
                        $window.addthis.layers.refresh();
                    }

                    $window.addthis.toolbox($element[0], $scope.config, $scope.share);

                    $scope.timer = $timeout($scope.removeStockButtons, 500);
                };

                $scope.init();

            }
        };
    }
]);
