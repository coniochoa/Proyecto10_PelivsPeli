//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladores = require('./controladores/controlador');
// var controladoresGenero = require('./controladores/controladorGenero');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/competencias', controladores.listarCompetencias);
app.get('/competencias/:id/peliculas', controladores.traerCompetencia);
app.post('/competencias/:idCompetencia/voto', controladores.votacionCompetencia);
app.get('/competencias/:id/resultados', controladores.obtenerResultados);
app.post('/competencias/', controladores.crearCompetencia);
app.get('/competencias/:id', controladores.nombreCompetencia);
app.get('/generos', controladores.generoCompetencia);
app.get('/directores', controladores.directorCompetencia);
app.get('/actores', controladores.actoresCompetencia);
app.delete('/competencias/:id', controladores.inactividad);
app.put('/competencias/:id', controladores.editor);
app.delete('/competencias/:id/votos', controladores.reiniciarCompetencia);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
