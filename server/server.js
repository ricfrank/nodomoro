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
    var SERVER_LOG_TOKEN = params.logger.subscribe("SERVER");

    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        params.logger.log("Request received: " + pathname, SERVER_LOG_TOKEN);
        params.route(params.handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    params.logger.log("Server started", SERVER_LOG_TOKEN);
}

exports.start = start;