var path = require('path');

var APP_PATH = {
	SERVER: "./server",
	MODEL: "./model"
}

var server = require(path.join(APP_PATH.SERVER, "server"));
var requestHandlers = require(path.join(APP_PATH.MODEL,"requestHandlers"));

var handle = {}

//server.start(router.route, handle);
server.start(handle);