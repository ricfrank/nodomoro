var token = 0;
var publishers = [];

function register(name){
	token += 1;
	var publisher = {
		name: name
	}
	publishers[token] = publisher;
	return token
}

function log(message, token) {
    console.log("[" + publishers[token].name + token+"] " + message);
}


exports.log = log;
exports.register = register;