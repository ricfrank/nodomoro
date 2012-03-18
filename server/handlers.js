/*
* Params:
*  - response: response object
*  - logger: logger object
*  - logger_channels: logger channels
*/
var taskFactory = require("../model/task");

function init(params) {
  params.logger.debug("Request handler 'start' was called.", params.logger_channels.handler);
  var responseMessage = "NodoMoro (TM)";
  params.response.writeHead(200, {"Content-Type": "text/html"});
  params.response.write(responseMessage);
  params.response.end();
}

var tasks = {};

function getTasks(params) {
	params.response.writeHead(200, {"Content-Type": "application/json"});
  	params.response.write(JSON.stringify(tasks));
 	params.response.end();
}

/* Datetime object for task creation*/
var date =  new Date();
var dateTime = {
	now: function(){
		return date.getTime();
	}
};

/* Unique Id generator for task creation*/
var currentId = 0;
var generator = {
    getId : function(){
        currentId += 1;
        return currentId;
    }
};

var userId = "1234";

function createTask(params) {
	var task = taskFactory.create(
		{
			userId: userId,
			dateTime: dateTime,
			uniqueIdGenerator: generator
		}
	);
	tasks[currentId] = tasks;
	params.response.writeHead(201, {
        "Content-Type": "application/json",
        "Location": "http://localhost:8888/tasks/"+currentId
    });
    params.response.write(task.stringify());
    params.response.end(); 

}

exports.init 	 = init;
exports.getTasks = getTasks;
exports.createTask = createTask;
