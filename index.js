var server = require("./server");
var requestHandlers = require("./requestHandlers");

var handle = {}

//server.start(router.route, handle);
server.start(handle);
    