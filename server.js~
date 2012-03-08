// cross-domain
//        response.writeHead(200, {
//            "Content-Type": "application/json",
//            'Access-Control-Allow-Origin' : '*'
//        });
//        response.write(JSON.stringify({
//            test : 'test'
//        }));

var http = require("http");
var url = require("url");


function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;