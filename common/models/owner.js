module.exports = function(Owner) {

    Owner.toPDF = function(cb) {

        Owner.find({}, function(err, owners) {
            var docDefinition = {
                pageOrientation: 'landscape',
                content: [{
                    text: 'export-pdf-20164305',
                    style: 'header'
                }, {
                    style: 'tableExample',
                    table: {
                        widths: ['20%', '20%', '20%', '20%', '20%'],
                        body: [

                            ['Name', 'Address', 'City', 'Telephone', 'Pets'],
                            ['George Franklin', '110 W. Liberty St.', 'Madison', '6085551023', 'Leo'],
                            ['Betty Davis', '638 Cardinal Ave. Sun', 'Prairie', '6085551749', 'Basil']
                        ]
                    }
                }],
                styles: {
                    header: {
                        alignment: 'center',
                        fontSize: 18,
                        //bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 16,
                        //bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15],
                        width: '20%'
                    },
                    tableHeader: {
                        //bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                },
                defaultStyle: {
                    alignment: 'justify'
                }
            };


            cb(err, docDefinition);

        })

    };



    Owner.remoteMethod('toPDF', {
        http: {
            verb: 'get'
        },
         returns: {arg:"definition",type: 'Object'}
    });
};
