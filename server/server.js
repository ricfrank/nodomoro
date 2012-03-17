var http = require("http");
var url = require("url");

/*
* Params:
*  - route: route function
*  - handle: handler function
*  - logger: logger object
*  - logger_token: logger token to publish somerthing on logger
*  - port: listen port, (default 8888)
*/
function start(params) {

    
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        params.logger.log("Request received: " + params.pathname, params.logger_token);
        params.route(
            {
                handle: params.handle,
                pathname: pathname,
                response: response,
                request: request,
                logger : params.logger,
                logger_token : params.logger.register("ROUTER")
            });
    }

    http.createServer(onRequest).listen(8888);
    params.logger.log("Server started", params.logger_token);
}

exports.start = start;