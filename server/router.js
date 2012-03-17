/*
* Params:
*  - handle: handler function
*  - pathname: request path
*  - request: request object
*  - response: response object
*  - logger: logger object
*  - logger_token: token to publish in logger
*/
function route(params){
	var logger_token =  params.logger.register("SERVER");
	params.logger.log("About to route a request for " + params.pathname, params.logger_token);
	if (typeof params.handle[params.pathname] === 'function') {
		params.handle[params.pathname](
		{
			response     : params.response,
			logger       : params.logger,
			logger_token : params.logger.register("HANDLER " + params.pathname)
		});
	} else {
		params.logger.log("No request handler for " + params.pathname, params.logger_token);
		params.response.writeHead(404, {"Content-Type":"text/html"});
		params.response.write("404 Not Found");
		params.response.end();
	}
}

exports.route = route;