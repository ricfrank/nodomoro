var token = 0;
var subscribers = [];

function subscribe(name){
	var subscriber = {
		name: name
	}
	subscribers[token] = subscriber;
	return token
}

function log(message, token) {
    console.log("[" + subscribers[token].name + "] " + message);
}

exports.log = log;
exports.subscribe = subscribe;