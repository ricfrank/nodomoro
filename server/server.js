var http = require("http");
var url = require("url");

/*
* Params:
*  - route: route function
*  - handle: handler function
*  - logger: logger object
*  - port: listen port, (default 8888)
*/
function start(params) {
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        params.logger.log("Request received: " + pathname);
        params.route(params.handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    params.logger.log("Server started");
}

exports.start = start;