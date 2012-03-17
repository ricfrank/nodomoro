var APP_PATH = {
	SERVER: "./server/",
	MODEL: "./model/"
};

var server   = require(APP_PATH.SERVER + "server");
var router   = require(APP_PATH.SERVER + "router");
var handlers = require(APP_PATH.SERVER + "handlers");
var logger   = require(APP_PATH.SERVER + "logger"); 

var handle = {
	"/": handlers.init
}

server.start(
	{
		route:router.route,
		handle: handle,
		logger: logger
	});