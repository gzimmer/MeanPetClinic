'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Demonstrate how to register services
// In this case it is a simple constant service.
var module = angular.module('petclinic.services', [])

module.factory('typeSer', ['Type', '$q',function (Type, $q) {

    var types;

    var TypeService = function () {

    }

    TypeService.prototype.getTypes = function () {

        return $q(function (resolve, reject) {

            if (!types) {

                Type.find({}, function (d, headers) {
                    types = d;
                    resolve(types);
                });
            } else {
                resolve(types);
            }
        });
    }

    return new TypeService();
}]);