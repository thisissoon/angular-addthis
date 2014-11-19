"use strict";
/**
 * Cache / proxy for data to share between scopes in angular.
 * Data can be stored in service by calling: DataStore.set("foo", 123),
 * where "foo" is the key/reference of the data item and 123 is the
 * data we want to store. You can then retrieve any data by using:
 * DataStore.get("foo") which will return the value of the key "foo" in
 * the service.
 * @class  snDataStore
 * @module sn.utils
 * @author SOON_
 */
angular.module("sn.utils").service("snDataStore", [
    /**
     * @constructor
     */
    function() {

        /**
         * Object to store key/value pairs for data items.
         * @private
         * @property data
         * @type     {Object}
         */
        var data = {};

        /**
         * Getter function. Gets value of key in data.
         * @public
         * @method get
         * @param  key {String} key in object to return value of
         * @return {*}          value of key in data
         */
        this.get = function get(key){
            return data[key];
        }

        /**
         * Setter function. Adds key/value pair to data or updates
         * the key in data if key already exists.
         * @public
         * @method set
         * @param  key   {String} key to update or add in data
         * @param  value {*}      value to set for key in data
         * @return {*}            the new or updated value of key in data
         */
        this.set = function set(key, value){
            data[key] = value;
            return value;
        }

        /**
         * Removes key/value pair from data.
         * @public
         * @method remove
         * @param  key    {String} key in data to be removed
         */
        this.remove = function remove(key){
            delete data[key];
        }

        /**
         * Deletes all data in DataService by assigning a blank
         * object to data.
         * @public
         * @method clear
         */
        this.clear = function clear(){
            data = {};
        }

    }
]);
