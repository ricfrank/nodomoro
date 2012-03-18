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
    
    var info = function(message) {
        params.logger.info(message, params.logger_channels.server);
    }

    function onRequest(request, response){
        var method = request.method;
        var pathname = url.parse(request.url).pathname;
        info(method + " " + pathname);
        params.route(
            {
                handle          : params.handle,
                pathname        : pathname,
                method          : method,
                response        : response,
                request         : request,
                logger          : params.logger,
                logger_channels : params.logger_channels
            });
    }

    http.createServer(onRequest).listen(8888);
    info("Server started");
}

exports.start = start;