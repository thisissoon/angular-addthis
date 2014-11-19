"use strict";
/**
 * Based on {@link http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site}
 * Returns the number of seconds, minutes, days, months
 * or years for a date from the current system time.
 * @class  timeSince
 * @module sn.utils
 * @author SOON_
 **/
angular.module("sn.utils").filter("timeSince", function(){
    return function (input) {

        /**
         * Attempt to convert the input into a Date object
         * @property date
         * @type {Date}
         */
        var date = new Date(input);

        // If not a valid date return the original input
        if (!(date instanceof Date)){
            return input;
        }
        /**
         * Calulate the time in seconds from Date Object to 'now'
         * @property seconds
         * @type {Date}
         */
        var seconds = Math.floor((new Date() - date) / 1000);

        /**
         * We try to divide the number of seconds between now
         * and the date by the number of seconds in a year, month,
         * day, hour or minute
         * @property interval
         * @type {Date}
         */
        var interval = Math.floor(seconds / 31536000);


        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
});
