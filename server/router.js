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

	var isFunction = function(object){
		return (typeof object === 'function');
	}

	var notFunction = function(object){
		return  !isFunction(object);
	}
	
	var canHandlePath = function(path){
		return params.handle[path] !== undefined;
	}

	var canHandleMethod = function(path, method){
		return isFunction(params.handle[path][method]);
	}

	var canHandle = function(path, method){
		return (
			canHandlePath(path) &&
			canHandleMethod(path, method)
		);
	}

	var info  =  function(message){
		params.logger.info(message, params.logger_channels.router);
	};

	var err  =  function(message){
		params.logger.err(message, params.logger_channels.router);
	};

	var callRealHandler =  function(path, method, handleParams){
		params.handle[path][method](handleParams);
	}

	var callErrorHandler =  function(path, method, handleParams){
		var errorMessage = "No route: " + method + " " + path;
		err(errorMessage);
		params.response.writeHead(404, {"Content-Type":"application/json"});
		params.response.write(errorMessage);
		params.response.end();
	}

	var safeHandle = function(path, method, handleParams){
		var handle = canHandle(path, method) ?
						function(){
							callRealHandler(path, method, handleParams);
						} :
						function(){
							callErrorHandler(path, method, handleParams);
						};
		handle();
	}

	safeHandle(
		params.pathname,
		params.method,
		{
			response        : params.response,
			logger          : params.logger,
			logger_channels : params.logger_channels
		}
	)
	info( params.method + " " + params.pathname);
}

exports.route = route;