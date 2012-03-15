function createTask(params){

    var validateParams = function(){
        if (params.userId === undefined || 
            params.dateTime === undefined ||
            params.uniqueIdGenerator === undefined){
            throw "Inavlid params";
        }
    }

    var creationTimeStamp = 0;
    var id = 0;

    
    var setCreationTimeStamp = function(){
        creationTimeStamp =  params.dateTime.now();
    }

    var setUniqueId = function(){
        id =  params.uniqueIdGenerator.getId();
    }
    
    var wasBorn =  function(){
        return creationTimeStamp;
    }

    var init = function(){
        validateParams();
        setUniqueId();
        setCreationTimeStamp();
    }
    
    
    
    var task = {};
    init();
    task.wasBorn = wasBorn;
    return task;
}

exports.create = createTask;