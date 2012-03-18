var channels = {};
var levels = ["DEBUG","ERROR","INFO","WARN"];

var colortags = {
	open : {
		none  : "",
		red   : "\033[1;31m",
		green : "\033[1;32m",
		yellow: "\033[1;33m"
	},
	close : {
		none  : "",
		red   : "\033[0m",
		green : "\033[0m",
		yellow: "\033[0m"
	}
}

var levelsColor = {
	"DEBUG" : "none",
	"ERROR" : "red",
	"INFO"  : "green",
	"WARN"  : "yellow"
}

function colorize(message, level){
	return colortags.open[levelsColor[level]] + message + colortags.close[levelsColor[level]]
}

function createChannelTag(channel){
	return "[" + channels[channel].name + "] ";
}

function register_channel(name){
	channels[name] = {
		name : name
	};
}

function log(message, channel, level) {
    console.log(colorize(createChannelTag(channel), level) + message);
}

function err(message, channel){
	log(message,channel,"ERROR");
}

function debug(message, channel){
	log(message,channel,"DEBUG");
}

function info(message, channel){
	log(message,channel,"INFO");
}

function warn(message, channel){
	log(message,channel,"WARN");
}

exports.err   = err;
exports.debug = debug;
exports.info  = info;
exports.warn  = warn;
exports.register_channel = register_channel;