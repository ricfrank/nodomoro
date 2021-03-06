var fs =  require('fs');
var redis =  require('redis');
var redis_client =  redis.createClient();
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

var tasksDto = [];

function getTasks(params) {
	params.response.writeHead(200, {"Content-Type": "application/json"});
  	params.response.write(JSON.stringify(tasksDto));
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
    getId : function(params){
        currentId += 1;
        params.success(currentId);
    }
};

var redisTaskIdGenerator = {
  getId : function(params){
    redis_client.incr("tasks:nextId", function(err, id){
      params.success(id);
    })
  }
}

var userId = "1234";

var TASK_FILEPATH = './data/db.txt';
var targetFilestream = fs.createWriteStream(
  TASK_FILEPATH,
  {
    flags:'a+',
    encoding:null,
    mode:0666
  }
);



function createTask(params) {

  var writeToFile = function(task){
    targetFilestream.write(JSON.stringify(task.getDto()));
    params.logger.debug("Writing: "+ task.getDto(), params.logger_channels.handler);
  };

  var writeToRedis =  function(task){
    var taskDto = task.getDto();
    redis_client.set("tasks:"+taskDto.id, JSON.stringify(taskDto));
  }

  var respondeToClient = function(task){
    tasksDto.push(task.getDto());
    params.response.writeHead(201, {
        "Content-Type": "application/json",
        "Location": "http://localhost:8888/tasks/"+currentId
    });
    params.response.write(JSON.stringify(task.getDto()));
    params.response.end(); 
  }

  var onSuccess = function (task){
    //writeToFile(task);
    writeToRedis(task);
    respondeToClient(task);
  }

  var onTaskcreationError = function(error){
    params.logger.error("Unable to create Task: "+ error, params.logger_channels.handler);
  }

	taskFactory.create(
		{
			userId: userId,
			dateTime: dateTime,
			uniqueIdGenerator: redisTaskIdGenerator,
      success : onSuccess,
      error : onTaskcreationError
		}
	);
}

exports.init 	 = init;
exports.getTasks = getTasks;
exports.createTask = createTask;
