"use strict";
/**
 * AddThis widget directive, Re-renders addthis buttons as angular changes views in our app since
 * the add this buttons only load by default on page load and not when the DOM is updated. based on:
 * {@link http://stackoverflow.com/questions/15593039/angularjs-and-addthis-social-plugin}
 * @example
 *  Usage:
 *   <!-- 1. include `addthis_widget.js` in index page with async attribute -->
 *   <script src="//s7.addthis.com/js/300/addthis_widget.js#pubid={pubid}&domready=1" async="async"></script>
 *
 *   <!-- 2. add "sn-addthis-toolbox" directive to a widget's toolbox div
 *   <div class="addthis_custom_sharing" sn-addthis-toolbox>
 *     ...       ^
 *   </div>
 *
 *   <!-- 3. add classes to anchor links to attach the link to a service -->
 *   <!-- ['addthis_button_google_plusone_share','addthis_button_twitter','addthis_button_facebook'] -->
 *   <a href class="addthis_button_google_plusone_share">Share on Google+</a>
 *
 * @class  snAddthisToolbox
 * @module sn.utils
 * @author SOON_
 */
angular.module("sn.utils").directive("snAddthisToolbox", [
    "$document",
    "$timeout",
    /**
     * @constructor
     * @param {Service} $document
     * @param {Service} $timeout
     */
    function ($document, $timeout) {
        return {
            restrict: "A",
            replace: false,
            scope: {
                url: "@",
                title: "@",
                description: "@",
            },
            link: function ($scope, $element, attrs) {

                /**
                 * Number of times to check for stock addthis buttons
                 * @property checksLeft
                 * @type     {Number}
                 * @default  10
                 */
                var checksLeft = 10;

                /**
                 * Store $timeout instance in variable to clear later
                 * @property checksLeft
                 * @type     {$timeout}
                 */
                var timer;

                /**
                 * {@link http://support.addthis.com/customer/portal/articles/1337994-the-addthis_config-variable}
                 * @property addthis_config
                 * @type     {Object}
                 */
                var addthis_config = addthis_config || {};

                /**
                 * {@link http://support.addthis.com/customer/portal/articles/1337996-the-addthis_share-variable}
                 * @property addthis_share
                 * @type     {Object}
                 */
                var addthis_share = {
                    url: $scope.url,
                    title : $scope.title,
                    description : $scope.description
                }

                /**
                 * Removes the stock addthis buttons
                 * @method removeStockButtons
                 */
                var removeStockButtons = function removeStockButtons() {
                    if (checksLeft > 0){
                        checksLeft--;

                        var addthisEl = $document[0].getElementById("atstbx");

                        if (addthisEl){
                            addthisEl.parentNode.removeChild(addthisEl);
                        } else {
                            if (timer) {
                                $timeout.cancel(timer)
                            }
                            timer = $timeout(removeStockButtons, 500);
                        }
                    }
                }

                /**
                 * Initialise the addthis buttons on directive load
                 * @method init
                 */
                var init = function init(){

                    if (timer) {
                        $timeout.cancel(timer)
                    }

                    addthis.init();
                    addthis.toolbox($element[0], addthis_config, addthis_share);

                    timer = $timeout(removeStockButtons, 1000);
                }

                init();

            }
        }
    }
]);
