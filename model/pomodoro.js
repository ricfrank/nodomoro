function createPomodoro(params) {
	
	var validOrDefaultDuration = function(duration){
		var DEFAULT_POMODORO_DURATION = 1000;
		return (duration !== undefined) ?
			(Math.floor(duration/1000))*1000 :
			DEFAULT_POMODORO_DURATION;
	}

	var _started = false;
	var _finished = false;
	var _duration = validOrDefaultDuration(params.duration);
	var pomodoro = {};

	var stop = function(){
		_started =  false;
		_finished = true;
	}

	var start = function(callerPomodoroFinishedCb){
		_started =  true;
		setTimeout(function(){
			stop();
			if (callerPomodoroFinishedCb !== undefined){
				callerPomodoroFinishedCb();
			}
		}
		,_duration);
	}

	var isRunning = function(){
		return _started === true;
	}

	var isFinished = function(){
		return _finished === true;
	}

	var duration = function(){
		return (_duration/1000).toString() + " sec";
	}

	//Public members of pomodoro
	pomodoro.start = start;
	pomodoro.isRunning = isRunning;
	pomodoro.isFinished = isFinished
	pomodoro.duration =  duration;

	return pomodoro;
};

exports.create = createPomodoro;