'use strict';
/* App Controllers */

angular.module('petclinic.controllers', []).controller('ownersFindController', ['$scope', '$state', 'Owner', '$rootScope', function($scope, $state, Owner, $rootScope) {

    $scope.getOwner = function() {
        var filter;

        if ($scope.lastName === '%') {
            filter = {};
        }
        else {
            filter = {
                "filter": {
                    "where": {
                        "lastName": $scope.lastName
                    }
                }
            }
        }
        Owner.find(filter, function(d, cb) {

            if (d != '') {
                $rootScope.owners = d;
                var fin = new Date();
                if (d.length > 1) {
                    $state.go("listOwner");

                }
                else {
                    $rootScope.owner = d[0];
                    $state.go("ownerDetails");
                }
            }
            else {
                // Revoir et utiliser ngMessages
                $scope.msg = "has not been found";
            }

        });

    }

}]);

angular.module('petclinic.controllers').controller('ownerDetailsController', ['$scope', function($scope) {}]);

angular.module('petclinic.controllers').controller('ownersListController', ['$scope', '$state', '$rootScope', 'Owner', '$q', '$compile', '$http', function($scope, $state, $rootScope, Owner, $q, $compile, $http) {


    $scope.renderPets = function(pets) {
        var res = '';
        pets && pets.forEach(function(pet) {
            res += pet.name + " "
        });
        return res;
    }

    $scope.getOwnerById = function(id) {
        var owners = $rootScope.owners;
        var len = owners.length;
        while (len--) {
            if (owners[len].id === id) {
                $rootScope.owner = owners[len];
                $state.go("ownerDetails");
            }
        }

    };

}]);

angular.module('petclinic.controllers').controller('ownerEditController', ['$scope', '$rootScope', '$state', 'Owner', function($scope, $rootScope, $state, Owner) {

    $scope.action = 'edit';
    var currentOwner = $scope.owner;

    $scope.upsertOwner = function(id) {

        var owner = {
            "firstName": currentOwner.firstName,
            "lastName": currentOwner.lastName,
            "address": currentOwner.address,
            "city": currentOwner.city
        }

        if (currentOwner.telephone != "") {
            owner.telephone = currentOwner.telephone;
        }
        var parent = $scope.$parent;
        if (id == null) {
            Owner.create(owner, function(data) {
                parent.owners = [data];
            }, function(err) {
                console.log(err)
            });

        }
        else {
            owner.id = id;
            Owner.upsert(owner, function(data) {
                parent.owners = [data];
            }, function(err) {
                console.log(err)
            });

        }
        $state.go("ownerDetails");
    };
}]);

angular.module('petclinic.controllers').controller('ownerAddController', ['$scope', '$state', '$rootScope', 'Owner', function($scope, $state, $rootScope, Owner) {
    $scope.action = 'add';
    $scope.owner = {};
    $scope.upsertOwner = function(id) {

        var owner = {
            "firstName": $scope.owner.firstName,
            "lastName": $scope.owner.lastName,
            "address": $scope.owner.address,
            "city": $scope.owner.city
        }

        if ($scope.owner.telephone != "") {
            owner.telephone = $scope.owner.telephone;
        }
        var parent = $scope.$parent;
        if (id == null) {
            Owner.create(owner, function(data) {
                    $rootScope.owners.push(data);
                    $rootScope.owner = data;
                },
                function(err) {
                    console.log(err)
                });

        }
        else {
            owner.id = id;
            Owner.upsert(owner, function(data) {
                parent.owners = [data];
            }, function(err) {
                console.log(err)
            });

        }
        $state.go("ownerDetails");

    }
}]);


angular.module('petclinic.controllers').controller('petsAddController', ['$scope', '$rootScope', '$state', '$stateParams', 'Owner', 'typeSer', function($scope, $rootScope, $state, $stateParams, Owner, typeSer) {


    $scope.action = 'new';

    Owner.find({
        "filter": {
            "where": {
                "id": $stateParams.ownerId
            }
        }
    }, function(d, err) {

        if (d != '') {
            $rootScope.owner = d[0];
            setTypes();


        }
        else {
            $scope.msg = "has not been found";
        }

    });


    var setTypes = function() {

        typeSer.getTypes().then(function(types) {
            $scope.types = types;
            $scope.type = types[0];

        });
    }


    /*      upsert      */

    $scope.upsertPet = function() {

        var pet = {
            "name": $scope.name,
            "birthdate": $scope.birthdate,
            "type": $scope.type.name
        }

        if ($rootScope.owner.pets) {
            $rootScope.owner.pets.push(pet);
        }
        else {
            $rootScope.owner.pets = [pet];
        }
        Owner.upsert($rootScope.owner, function(data) {}, function(err) {});
        $state.go("ownerDetails");
    }
}]);

angular.module('petclinic.controllers').controller('petsEditController', ['$scope', '$state', '$stateParams', 'Owner', 'typeSer', '$rootScope', function($scope, $state, $stateParams, Owner, typeSer, $rootScope) {


    $scope.action = 'edit';

    var setTypes = function(petType) {

        typeSer.getTypes().then(function(types) {
            $scope.types = types;
            for (var i in types) {
                if (types[i].name === petType) {
                    $scope.type = types[i];
                    break;
                }
            }
        });
    }

    var pets = $rootScope.owner.pets;
    var petId = $stateParams.petId;
    for (var pet in pets) {
        var petInTest = pets[pet];
        if (petInTest.name === petId) {
            $scope.name = petInTest.name;
            $scope.birthdate = petInTest.birthdate;
            $scope.type = petInTest.type;
            setTypes($scope.type);
            break;
        };


    }

    $scope.upsertPet = function() {
        var owner = $rootScope.owner;
        for (var n in owner.pets) {
            var pet = owner.pets[n];
            if (pet.name === $stateParams.petId) {
                pet.name = $scope.name;
                pet.birthdate = $scope.birthdate;
                pet.type = $scope.type.name;
                break;
            }
        }
        Owner.upsert(owner, function(data) {
            console.log(data)
        }, function(err) {
            console.log(err)
        });
        $state.go("ownerDetails");
    }
}]);

angular.module('petclinic.controllers').controller('visiteAddController', ['$scope', '$state', '$stateParams', '$rootScope', 'Owner', 'Type', '$filter', function($scope, $state, $stateParams, $rootScope, Owner, Type, $filter) {
    $scope.upsertVisit = function() {


            var owner = $rootScope.owner;

            for (var i = 0; i < $rootScope.owner.pets.length; i++) {
                var pet = owner.pets[i];
                if (pet.name === $scope.pet.name) {
                    pet.visites = pet.visites || [];
                    pet.visites.push({
                        date: $scope.date,
                        description: $scope.description
                    });
                    break;
                }
            }
            Owner.upsert(owner, function(data) {
                $state.go("ownerDetails");
            }, function(err) {
                //A traiter
                console.log(err);
            });

        }
        // get pet
    for (var i = 0; i < $rootScope.owner.pets.length; i++) {
        var pet = $rootScope.owner.pets[i];
        if (pet.name === $stateParams.petId) {
            $scope.pet = pet;
            break;
        }
    }
    $scope.precedentesVisites = $scope.pet.visites;
}]);


angular.module('petclinic.controllers').controller('vetsController', ['$rootScope', 'Veterinarian', function($rootScope, Veterinarian) {

    Veterinarian.find({}, function(vets, responseHeaders) {

        if (vets)
            $rootScope.vets = vets;
        else
            console.log("err", responseHeaders);

       /* setTimeout(function() {
            $('#vets').DataTable()
        }, 0);*/

    });

    function renderName(data) {
        return data.firstName + ' ' + data.lastName;
    }


}]);
