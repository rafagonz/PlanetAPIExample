var express = require('express');
var router = express.Router();
var PlanetaDAO = require('../models/planeta').PlanetaDAO;

//Database
//var planetas = {};


function planetas(db) {
	var planetaDAO = new PlanetaDAO(db);
// Rutas
router.route('/')
  .all(function (req, res, next) {
    res.set('Content-Type','application/json');
    next();
  })
.post(function (request, response) {

	if(!request.body.planeta)
		response.status(400).send({ error: 'Por favor, introduce un planeta'});

  // manipulamos la request
  var nuevoPlaneta = request.body.planeta;
  
  //Almacenamos el documento
   planetaDAO.insertPlaneta(nuevoPlaneta, function (err, result) {
        if (err) {
          res.send({'error':'Ha ocurrido un error en el servidor'});
        }

  //nuevoPlaneta.id = Date.now();

  //Almacenamos el nuevo planeta
   //planetas[nuevoPlaneta.id] = nuevoPlaneta;

  //preparamos la respuesta
  //response.set('Content-Type','application/json');
  response.status(201);

  console.log('Result Router: %j', result);
        // Enviamos la respuesta
        response.json({
          planeta: result
        });
    });

})

.get( function(request, response){
	//preparamos la respuesta
  //response.set('Content-Type','application/json');

  //Leemos los planetas de la BD
  planetaDAO.getPlanetas(function(err,result){
  	if(err){
  		 res.send({'error':'Ha ocurrido un error en el servidor'});
  	}

  	  response.status(200);

  	   // Enviamos la respuesta
	  response.json({
	      planetas: result
	    });
  });


 

});

router.route('/:id')
  .get(function(request, response){
	//preparamos la respuesta
  //response.set('Content-Type','application/json');
  response.status(201);
   var planeta = planetas[request.params.id];
   console.log('PLANET: %j', planeta);
    if (!planeta) {
    	console.log('NO PLANET');
      return response.status(404).send({ error: 'Planeta no encontrado' });
    }

  // Enviamos la respuesta
  response.send(planeta);

})
  .put(function(request, response){
	if(!request.body.planeta)
		response.status(400).send({ error: 'Por favor, introduce un planeta'});
	var planeta = request.body.planeta;

	planeta.id = parseInt(request.params.id);
	planetas[request.params.id] = planeta;

	response.status(200);

  // Enviamos la respuesta
  response.json({
    planeta: planeta
  });
}).delete(function(request, response){
	if(!request.body.planeta)
		response.status(400).send({ error: 'Por favor, introduce un planeta'});
	
	delete planetas[request.params.id];

	response.status(204);

  // Enviamos la respuesta
  response.send();
});
	this.router = router;
}

module.exports = planetas;