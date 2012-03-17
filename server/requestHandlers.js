//var exec = require("child_process").exec;
var querystring = require("querystring");

function init(response, postData) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<strong>Welcome to Nodomoro!!<strong>");
    response.end();
}

function sendPomodoro(response, postData) {
  
  /*è molto importante gestire tutte le operazioni di I/O come questa (esecuzione di un comando da shell o connessione a DB o interrogare il file system...)
  in maniera asincrona. Ricordati che Node è single thread e quindi se non si utilizzano
  queste tecniche si potrebbero verificare delle situazioni di malfunzionamento (dovuto ad istruzioni di blocking)
  vedi http://www.nodebeginner.org/#blocking-and-non-blocking*/

    var pomodoroData = querystring.parse(postData);
    console.log("Progetto: " + pomodoroData["id_progetto"]);
    console.log("Descrizione attività: " + pomodoroData["descrizione_attivita"]);
    console.log("Data: " + pomodoroData["data"]);
    console.log("Utente: " + pomodoroData["utente"]);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Pomodoro registrato!!");
    response.end();
    /*la response deve essere gestita dal requestHandler. Se invece di inviare e chiudere la response lo facciamo da server.js, si
     *potrebbero verificare situazioni nelle quali il contenuto della response ch viene inviato dal server non è ancora pronto.
     *http://www.nodebeginner.org/#responding-request-handlers-with-non-blocking-operations*/

}
exports.init = init;
exports.sendPomodoro = sendPomodoro;
