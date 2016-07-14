'use strict';
/* http://docs.angularjs.org/#!angular.widget */

angular.module('petclinic.widgets',[]).directive("pdfButton", function() {

    return {
        restrict: 'C', // Notice the C for "class" restriction
        template: '<button type="submit">PDF</button>'
    };


})
/*.directive('datatableWrapper', datatableWrapper);


function datatableWrapper($timeout, $compile) {
    return {
        restrict: 'E',
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: link
    };

    function link(scope, element) {
        console.log ("element",element);
        // Using $timeout service as a "hack" to trigger the callback function once everything is rendered
       $timeout(function () {
            // Compiling so that angular knows the button has a directive
            $compile(element.find('.pdf-button'))(scope);
       }, 0, false);
    }
}*/
