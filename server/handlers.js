function init(response) {
  console.log("Request handler 'start' was called.");
  
  var responseMessage = "NodoMoro (TM)";
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(responseMessage);
  response.end();
}

exports.init = init;