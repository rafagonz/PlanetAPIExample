var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient; //driver para conectarme a la bd

//Setup
var app = module.exports = express();
var port = process.env.PORT || 8000;

MongoClient.connect('mongodb://localhost:27017/planetasDB', function (err, db) {
  if(err) throw err;

	// Middleware
	app.use(logger('dev'));
	app.use(bodyParser.json());



/*app.get('/', function(req, res){
	res.send('Hello World');
});*/

	//Rutas
	var planetas = require('./routes/planetas');
	var planetasRouter = new planetas(db).router;
	app.use('/planetas', planetasRouter);

	app.listen(port, function () {  
	    console.log('Listening on port ' + port + '...');
	});
});