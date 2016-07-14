var js2xmlparser = require("js2xmlparser");
var Feed = require("feed");
var feed_read = require("feed-read");

module.exports = function(Veterinarian) {

    Veterinarian.toXML = function(cb) {

        Veterinarian.find({}, function(err, vets) {
            var props = {
                "id": true,
                "firstName": true,
                "lastName": true,
                "specialties": true
            };

            var result = [];
            for (var i = 0; i < vets.length; i++) {
                var vet = {};
                for (var prop in vets[i]) {
                    if (props.hasOwnProperty(prop)) {
                        vet[prop] = vets[i][prop].toString();
                    }
                }
                result.push(vet);
            }
            var data = {
                vetList: result
            };


            cb(err, {
                toXML: function() {
                    return js2xmlparser("vets", data);
                }
            });

        });
    };
    Veterinarian.remoteMethod('toXML', {
        http: {
            path: '/petclinic/vets.xml',
            verb: 'get'
        },
        returns: {
            type: 'object',
            root: "true"
        }

    });


     Veterinarian.toAtom = function(cb) {

        Veterinarian.find({}, function(err, vets) {

            var result = {};
            result.title = "Veterinarians";
            result.id = "tag:springsource.org";
            var array = [];
            for (var i = 0; i < vets.length; i++) {
                var vet = vets[i];
                var entry = { title: "Vet: " + vet.firstName + " " + vet.lastName,
                    id: "tag:springsource.org," + vet.id,
                    summary: "["+vet.specialties.toString()+"]",
                };
                
                array.push(entry);
            }
            result.entry = array;


            cb(err, {
                toXML: function() {
                    return js2xmlparser("feed", result);
                }
            });

        });
    };


    Veterinarian.remoteMethod('toAtom', {
        http: {
            path: '/petclinic/vets.atom',
            verb: 'get'
        },
        returns: {
            type: 'object',
            root: "true"
        }
    });
}
