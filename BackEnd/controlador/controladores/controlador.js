var con = require('../lib/conexionbd');

function listarCompetencias(req, res) {
    
    var sql = "select * from competencia WHERE inactivo = 0"

    // console.log(sql);
        
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        //   var response = {
        //     'competencias': resultado

        // };
    
        res.send(JSON.stringify(resultado));
    
    });
}


function traerCompetencia(req, res) {
    
  
    
    var sql = "select id, poster, titulo from pelicula ORDER BY RAND() LIMIT 2"; 

        
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (resultado.length == 0){
            console.log("No se encontro la pelicula buscada con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        } else {
        var response = {
            'peliculas': resultado,
        
        };
    
        res.send(JSON.stringify(response));
        }
    });
}

function votacionCompetencia(req, res) {
    
    var pelicula = req.body.idPelicula;
    var comp = req.params.idCompetencia;
    var sql = "INSERT INTO votos (voto_competencia, voto_pelicula) VALUES (" + comp + "," +  pelicula + ")"; 
  console.log(sql);
  console.log(pelicula);
  console.log(comp);
  
   con.query(sql, function(error, resultado, fields) {
     
      if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      }

      if (resultado.length == 0){
          console.log("No se encontro la pelicula buscada con ese id");
          return res.status(404).send("No se encontro ninguna pelicula con ese id");
      } else {
        var response = {
            'voto': resultado.insertId,
        };
  
        res.json(response);
    }
  });
}

function obtenerResultados(req, res) {
    
    var comp = req.params.id; 
    var sql = "SELECT voto_pelicula, COUNT(*) AS votos, pelicula.titulo, pelicula.poster FROM votos JOIN competencia ON votos.voto_competencia = competencia.id JOIN pelicula ON votos.voto_pelicula = pelicula.id WHERE votos.voto_competencia = " + comp + " GROUP BY voto_competencia, voto_pelicula HAVING COUNT(*)>=1 ORDER BY votos DESC LIMIT 3"; 
             
    con.query(sql, function(error, resultado, fields) {
       
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
  
        if (resultado.length == 0){
            console.log("No se encontro la pelicula buscada con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        } else {
          var response = {
              'resultados': resultado
        };
    
          res.json(response);
      }
    });
}

function crearCompetencia(req, res) {
    var nuevo = req.body;
    var nombre = nuevo.nombre;
    var genero = nuevo.genero;
    var director = nuevo.director;
    var actor = nuevo.actor;
        

    
    if (nombre) {
        //si fue enviado el parámetro nombre isertamos el nombre de la pregunta
        var sql = "INSERT INTO competencia (nombre) VALUES ('" + nombre + "')";
    }
    if (nombre  && genero > 0) {
        var sql = "INSERT INTO competencia (nombre, genero) VALUES ('" + nombre + "'," + genero + ")";
    }
    if (nombre && (genero < 1) && (director > 0)) {
        var sql = "INSERT INTO competencia (nombre, director) VALUES ('" + nombre + "'," + director + ")";
    }
    if (nombre  && (genero > 0) && (director>0)) {
        var sql = "INSERT INTO competencia (nombre, genero, director) VALUES ('" + nombre + "'," + genero + "," + director + ")";
    }
    if (nombre  && (genero < 1) && (director < 1) && (actor > 0) ) {
        var sql = "INSERT INTO competencia (nombre, actor) VALUES ('" + nombre + "'," + actor + ")";
    }
    if (nombre  && (genero > 0) && (director > 0) && (actor > 0) ) {
        var sql = "INSERT INTO competencia (nombre, genero, director, actor) VALUES ('" + nombre + "'," + genero + ","+ director +  "," + actor + ")";
    }
    if (nombre  && (genero > 0) && (director < 1) && (actor > 0) ) {
        var sql = "INSERT INTO competencia (nombre, genero, actor) VALUES ('" + nombre + "'," + genero + "," + actor + ")";
    }
        console.log(sql);

    con.query(sql, function(error, resultado, fields) {
    
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
        
        res.json(resultado);
    }
    });
}

function nombreCompetencia(req, res) {

    var nombreCompetencia = req.params.id;
    console.log(nombreCompetencia);
        
    var sql = "SELECT * FROM competencia WHERE id = " + nombreCompetencia;
                
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
            var response = {
                'id': resultado,
                'nombre': resultado[0].nombre
                };   
                
            res.json(response);
        }
    });
}

function generoCompetencia(req, res) {
        
    var sql = "SELECT * FROM genero";
                
    con.query(sql, function(error, resultado, fields) {
        
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            res.send(JSON.stringify(resultado));
        
    });
}

function directorCompetencia(req, res) {
    
    var sql = "SELECT * FROM director";
            
    con.query(sql, function(error, resultado, fields) {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        res.send(JSON.stringify(resultado));

    });
}

function actoresCompetencia(req, res) {
    
    var sql = "SELECT * FROM actor";
            
    con.query(sql, function(error, resultado, fields) {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        res.send(JSON.stringify(resultado));

    });
}

function inactividad(req, res) {
    
    var inactivo= req.params.id;
    var sql= "UPDATE competencia SET inactivo = 1 WHERE id =" +inactivo;
                
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
            var response = {
                'id': resultado
            };       
            res.json(resultado);
        }
    });
}

function editor(req, res) {
    
    var id = req.params.id;
    var nombre = req.body.nombre;
    var sql= "UPDATE competencia SET nombre = '" + nombre + "' WHERE id = " + id;
           
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
            var response = {
                'id': resultado
            };       
            res.send(JSON.stringify(response));
            }
    });
}
  
function reiniciarCompetencia(req, res) {
    
    var reinicio= req.params.id;
    var sql= "DELETE FROM votos WHERE voto_competencia =" + reinicio;
                
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
            var response = {
                'id': resultado
            };       
            res.json(resultado);
        }
    });
}


module.exports = {
    listarCompetencias: listarCompetencias, 
    traerCompetencia: traerCompetencia,
    votacionCompetencia: votacionCompetencia,
    obtenerResultados: obtenerResultados,
    crearCompetencia: crearCompetencia,
    nombreCompetencia: nombreCompetencia,
    generoCompetencia: generoCompetencia,
    directorCompetencia: directorCompetencia,
    actoresCompetencia: actoresCompetencia,
    inactividad: inactividad,
    editor: editor,
    reiniciarCompetencia: reiniciarCompetencia,
}