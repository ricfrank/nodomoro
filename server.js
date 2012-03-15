function start(handle) {

    var app = require('express').createServer();

    app.get('/', function(req, res){
        res.send('hello world');
    });

    app.get('/pomodoro/:id', function(req, res){
        res.send('Pomodoro id: ' + req.params.id);
    });

    app.post('/pomodoro', function(req, res){
        res.send('Pomodoro creato ' + req.params.id);
             
    });

    app.listen(3000);
    
    console.log("Server has started.");
}

exports.start = start;
