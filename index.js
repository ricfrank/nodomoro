var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.init;
handle["/send-pomodoro"] = requestHandlers.sendPomodoro;

server.start(router.route, handle);

    