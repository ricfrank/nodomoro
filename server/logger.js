var channels = {};

function register_channel(name){
	channels[name] = {
		name : name
	};
}

function log(message, channel) {
    console.log("[" + channels[channel].name + "] " + message);
}


exports.log = log;
exports.register_channel = register_channel;