var APP_PATH = {
	SERVER: "./server/",
	MODEL: "./model/"
};

var server   = require(APP_PATH.SERVER + "server");
var router   = require(APP_PATH.SERVER + "router");
var handlers = require(APP_PATH.SERVER + "requestHandlers");

var handle = {
	"/": handlers.init
}

server.start(router.route, handle);