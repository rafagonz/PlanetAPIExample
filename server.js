var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

//Setup
var app = express();
var port = process.env.PORT || 8000;

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

//Database
var planetas = {};

/*app.get('/', function(req, res){
	res.send('Hello World');
});*/

// Rutas
app.post('/planetas', function (request, response) {

	if(!request.body.planeta)
		response.status(400).send({ error: 'Por favor, introduce un planeta'});

  // manipulamos la request
  var nuevoPlaneta = request.body.planeta;
  nuevoPlaneta.id = Date.now();

  //Almacenamos el nuevo planeta
   planetas[nuevoPlaneta.id] = nuevoPlaneta;

  //preparamos la respuesta
  response.set('Content-Type','application/json');
  response.status(201);

  // Enviamos la respuesta
  response.json({
    planeta: nuevoPlaneta
  });

});

app.get('/planetas', function(request, response){
	//preparamos la respuesta
  response.set('Content-Type','application/json');
  response.status(201);

  // Enviamos la respuesta
  response.send(planetas);

});

app.get('/planetas/:id', function(request, response){
	//preparamos la respuesta
  response.set('Content-Type','application/json');
  response.status(201);

  // Enviamos la respuesta
  response.send(planetas[request.params.id]);

});

app.listen(port, function () {  
    console.log('Listening on port ' + port + '...');
});