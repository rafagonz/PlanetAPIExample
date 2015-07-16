var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

//Setup
var app = module.exports = express();
var port = process.env.PORT || 8000;

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());



/*app.get('/', function(req, res){
	res.send('Hello World');
});*/

//Rutas
var planetas = require('./routes/planetas');
app.use('/planetas', planetas);

app.listen(port, function () {  
    console.log('Listening on port ' + port + '...');
});