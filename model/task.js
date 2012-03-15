function createTask(params){
    
    var dateTime = params.dateTime;
    var creationTimeStamp = 0;
    
    var setCreationTimeStamp = function(){
        creationTimeStamp =  dateTime.now();
    }
    
    var wasBorn =  function(){
        return creationTimeStamp;
    }

    var validateParams = function(){
        if (params.userId === undefined || params.dateTime === undefined){
            throw "Inavlid params";
        }
    }
    
    var init = function(){
        validateParams();
        setCreationTimeStamp();
    }
    
    
    
    var task = {};
    init();
    task.wasBorn = wasBorn;
    return task;
}

exports.create = createTask;