function createTask(params){

    var validateParams = function(){
        if (params.userId === undefined || 
            params.dateTime === undefined ||
            params.uniqueIdGenerator === undefined){
            params.error("Invalid params");
        } else {
            setUniqueId();
        }
    }

    var _creationTimeStamp = 0;
    var _id = 0;
    var _description = params.description ? params.description : "";
    var _userId = "";
    var _taskCreatedObservers = [];

    var setUserId = function() {
        _userId = params.userId;
    }
    
    var setCreationTimeStamp = function(){
        _creationTimeStamp =  params.dateTime.now();
        addTaskCreatedObserver();
    }

    var setUniqueId = function(){
        params.uniqueIdGenerator.getId(
            {
                success:uniqueIdGenerated
            }
        );
    }

    var uniqueIdGenerated = function(id){
        _id = id;
        setCreationTimeStamp();
    }

    var addTaskCreatedObserver =  function(){
        if (typeof params.onTaskCreated === 'function'){
            _taskCreatedObservers.push(params.onTaskCreated);
        };
        taskInitialized()
    }
    
    var wasBorn =  function(){
        return _creationTimeStamp;
    }

    var init = function(){
        validateParams();
    }

    var notifyTaskCreated =  function(){
        for (index in _taskCreatedObservers){
            _taskCreatedObservers[index](getDto());
        };
    }

    var getDto = function(){
        var dto = {
            id: _id,
            userId: _userId,
            creationTimestamp : _creationTimeStamp,
            description : _description
        };
        return dto;
            
    }

    var taskInitialized = function(){
        task.wasBorn = wasBorn;
        task.getDto =  getDto;
        params.success(task);
        notifyTaskCreated();
    }
    
    
    
    var task = {};
    init();
    notifyTaskCreated();
    task.wasBorn = wasBorn;
    task.getDto = getDto;
}

exports.create = createTask;