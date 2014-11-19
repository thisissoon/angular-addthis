"use strict";
/**
 * Converts an hexidecimal color value to an rgba string.
 * {@link http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
 * @class  rgba
 * @module sn.utils
 * @author SOON_
 **/
angular.module("sn.utils").filter("rgba", function(){
    return function (hex, opacity) {

        if (hex){

            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                (parseFloat(opacity || 1))
            ].join(",") : null;
        } else return hex
    }
});
