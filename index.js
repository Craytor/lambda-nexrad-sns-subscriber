var request = require('request');

exports.handler = function(event) {
    var records = event.Records;

    for(var i=0; i<records.length; i++) {
        var body = records[i]['body'];
        var decoded = JSON.parse(body)
        var s3Obj = JSON.parse(decoded.Message)
        var recordsNew = s3Obj["Records"];
        var innerS3Obj = recordsNew[0]

        request.post('http://mydomain.com/call',{
                json: innerS3Obj.s3.object
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }
};
