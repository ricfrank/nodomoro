/*
* Params:
*  - handle: handler function
*  - pathname: request path
*  - method: http method
*  - request: request object
*  - response: response object
*  - logger: logger object
*  - logger_channels: token to publish in logger
*/


function route(params){
	
	var canHandle = function(path, method){
		if (params.handle[path] === undefined){
			return false;
		} else if (typeof params.handle[path][method] !== 'function') {
			return false;
		}
		return true;
	}

	var info  =  function(message){
		params.logger.info(message, params.logger_channels.router);
	};

	var err  =  function(message){
		params.logger.err(message, params.logger_channels.router);
	};

	info( params.method + " " + params.pathname);

	if (canHandle(params.pathname, params.method)) {
		params.handle[params.pathname][params.method](
		{
			response        : params.response,
			logger          : params.logger,
			logger_channels : params.logger_channels
		});
	} else {
		err("No route: " + params.method + " " + params.pathname);
		params.response.writeHead(404, {"Content-Type":"text/html"});
		params.response.write("404 Not Found");
		params.response.end();
	}
}

exports.route = route;