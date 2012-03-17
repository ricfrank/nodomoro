function createTask(params){

    var validateParams = function(){
        if (params.userId === undefined || 
            params.dateTime === undefined ||
            params.uniqueIdGenerator === undefined){
            throw "Inavlid params";
        }
    }

    var _creationTimeStamp = 0;
    var _id = 0;

    
    var setCreationTimeStamp = function(){
        _creationTimeStamp =  params.dateTime.now();
    }

    var setUniqueId = function(){
        _id =  params.uniqueIdGenerator.getId();
    }
    
    var wasBorn =  function(){
        return _creationTimeStamp;
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