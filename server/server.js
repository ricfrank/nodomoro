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

    
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        params.logger.log("Request received: " + params.pathname, params.logger_channels.server);
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
    params.logger.log("Server started", params.logger_channels.server);
}

exports.start = start;