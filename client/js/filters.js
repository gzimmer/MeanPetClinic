'use strict';
/* http://docs.angularjs.org/#!angular.filter */

angular.module('petclinic.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
