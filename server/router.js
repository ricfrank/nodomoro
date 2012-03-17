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
	
	var log  =  function(message){
		params.logger.log(message, params.logger_channels.router);
	};

	log("About to route a request for " + params.pathname);
	if (typeof params.handle[params.pathname] === 'function') {
		params.handle[params.pathname](
		{
			response        : params.response,
			logger          : params.logger,
			logger_channels : params.logger_channels
		});
	} else {
		log("No request handler for " + params.pathname);
		params.response.writeHead(404, {"Content-Type":"text/html"});
		params.response.write("404 Not Found");
		params.response.end();
	}
}

exports.route = route;