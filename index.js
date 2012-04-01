var APP_PATH = {
	SERVER: "./server/",
	MODEL: "./model/"
};

var server   = require(APP_PATH.SERVER + "server");
var router   = require(APP_PATH.SERVER + "router");
var handlers = require(APP_PATH.SERVER + "handlers");
var logger   = require(APP_PATH.SERVER + "nullLogger");

var logger_channels = {
	server : "SERVER",
	router : "ROUTER",
	handler: "HANDLER"
}

logger.register_channel(logger_channels.server);
logger.register_channel(logger_channels.router);
logger.register_channel(logger_channels.handler);


var handle = {
	"/": {
		"GET" : handlers.init
	},
	"/tasks" : {
		"GET"  : handlers.getTasks,
		"POST" : handlers.createTask
	}
}

server.start(
	{
		route:router.route,
		handle: handle,
		logger: logger,
		logger_channels: logger_channels
	});