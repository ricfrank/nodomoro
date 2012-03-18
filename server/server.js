var http = require("http");
var url = require("url");

/*
* Params:
*  - route: route function
*  - handle: handler function
*  - logger: logger object
*  - logger_channels: list of logger channels
*  - port: listen port, (default 8888)
*/
function start(params) {
    
    var log = function(message) {
        params.logger.log(message, params.logger_channels.server);
    }

    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        log("Request received: " + params.pathname);
        params.route(
            {
                handle: params.handle,
                pathname: pathname,
                response: response,
                request: request,
                logger : params.logger,
                logger_channels : params.logger_channels
            });
    }

    http.createServer(onRequest).listen(8888);
    log("Server started");
}

exports.start = start;