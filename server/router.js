/*
* Params:
*  - handle: handler function
*  - pathname: request path
*  - request: request object
*  - response: response object
*  - logger: logger object
*  - logger_channels: token to publish in logger
*/
function route(params){
	params.logger.log("About to route a request for " + params.pathname, params.logger_channels.router);
	if (typeof params.handle[params.pathname] === 'function') {
		params.handle[params.pathname](
		{
			response        : params.response,
			logger          : params.logger,
			logger_channels : params.logger_channels
		});
	} else {
		params.logger.log("No request handler for " + params.pathname, params.logger_channels.router);
		params.response.writeHead(404, {"Content-Type":"text/html"});
		params.response.write("404 Not Found");
		params.response.end();
	}
}

exports.route = route;