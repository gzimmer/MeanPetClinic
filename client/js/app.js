'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
angular.module('petclinic', ['lbServices', 'petclinic.controllers', 'petclinic.filters', 'petclinic.services', 'petclinic.widgets', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state("home", {
                url: "/home",
                templateUrl: "partials/home.html"

            }).state("owners", {
                controller: "ownersFindController",
                url: "/owners",
                templateUrl: "partials/ownersFind.html"

            }).state("ownerDetails", {
                controller: 'ownerDetailsController',
                url: "/ownerDetails",
                templateUrl: "partials/ownerDetails.html"

            })
            .state("editOwner", {
                controller: 'ownerEditController',
                url: "/editOwner/:ownerId",
                templateUrl: "partials/addOwner.html"

            })
            .state("listOwner", {
                controller: 'ownersListController',
                url: "/listOwner",
                templateUrl: "partials/ownersList.html"

            }).state("addOwner", {
                controller: "ownerAddController",
                url: "/addOwner",
                templateUrl: "partials/addOwner.html"

            }).state("addPet", {
                controller: "petsAddController",
                url: "/addPet/:ownerId",
                templateUrl: "partials/addPet.html"

            }).state("editPet", {
                controller: "petsEditController",
                url: "/editPet/:ownerId/:petId",
                templateUrl: "partials/addPet.html"

            })
            .state("addVisit", {
                controller: "visiteAddController",
                url: "/addVisit/:ownerId/:petId",
                templateUrl: "partials/addVisit.html"

            })
            .state("vets", {
                controller: "vetsController",
                url: "/vets",
                templateUrl: "partials/vets.html"

            });




    }]);
