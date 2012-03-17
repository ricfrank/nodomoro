/*
* Params:
*  - response: response object
*  - logger: logger object
*  - logger_token: logger token to publish somerthing on logger
*/
function init(params) {
  params.logger.log("Request handler 'start' was called.",params.logger_token);
  var responseMessage = "NodoMoro (TM)";
  params.response.writeHead(200, {"Content-Type": "text/html"});
  params.response.write(responseMessage);
  params.response.end();
}

exports.init = init;