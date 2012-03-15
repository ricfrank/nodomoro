function createTask(params){
    
    var dateTime = params.dateTime;
    var creationTimeStamp = 0;
    
    var setCreationTimeStamp = function(){
        creationTimeStamp =  dateTime.now();
    }
    
    var wasBorn =  function(){
        return creationTimeStamp;
    } 
    
    var init = function(){
        if (params.userId === undefined){
            throw "User Id needed.";
        }
        setCreationTimeStamp();
    }
    
    
    
    var task = {};
    init();
    task.wasBorn = wasBorn;
    return task;
}

exports.create = createTask;