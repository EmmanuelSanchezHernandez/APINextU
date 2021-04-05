const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')



var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3399733',
    password: 'Z77AceR8Hf',
    database: 'sql3399733'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))

//ESPECIFICAR CAMPOS AUNQUE SEAN TODOS
// GET /api/v1/publicaciones
app.get('/api/v1/publicaciones', function (req, res){
pool.getConnection(function(err, connection){
    const query = 'SELECT * FROM publicaciones'
    connection.query(query, function(error, filas, campos){
        if(filas.length > 0){
            res.status(200)
            res.json({data: filas})
        }else{
            res.status(404)
            res.send({errors: "NO hay publicaciones", mysql: error})
        }
        
    })
    connection.release()
})
})

//GET /api/v1/publicaciones?busqueda=<palabra>
app.get('/api/v1/publicaciones', function (peticion, respuesta){
    pool.getConnection(function(error,connection){
        if (peticion.query.busqueda == undefined){
            query = "SELECT * FROM publicaciones;";
            connection.query(query,function(err,filas,campos){
                if (filas.length >0){
                respuesta.json({data:filas});
                } else {
                    respuesta.status(404);
                    respuesta.send('');
                }
            });
        } else {
            const primera = "'% "+connection.escape(peticion.query.busqueda)+" %'";
            const segunda = "'% "+connection.escape(peticion.query.busqueda)+"'";
            const tercera = "'"+connection.escape(peticion.query.busqueda)+" %'";
            const cuarta = "'"+connection.escape(peticion.query.busqueda)+"'";
            query = "SELECT * FROM publicaciones WHERE titulo LIKE "+primera+" OR titulo LIKE "+segunda+" OR titulo LIKE "+tercera+" OR titulo LIKE "+cuarta+" ";
            query += "UNION ";
            query += "SELECT * FROM publicaciones WHERE contenido LIKE "+primera+" OR contenido LIKE "+segunda+" OR contenido LIKE "+tercera+" OR contenido LIKE "+cuarta+" ";
            query += "UNION ";
            query += "SELECT * FROM publicaciones WHERE resumen LIKE "+primera+" OR resumen LIKE "+segunda+" OR resumen LIKE "+tercera+" OR resumen LIKE "+cuarta+" ";
            query += ";"
            connection.query(query,function(err,filas,campos){
                if (filas.length >0){
                respuesta.json({data:filas});
                } else {
                    respuesta.status(404);
                    respuesta.send('');
                }
            });
        }
        connection.release();
    });
})

// GET /api/v1/publicaciones/<id>
app.get('/api/v1/publicaciones/:id', function(req, res){
    pool.getConnection(function(err, connection) {
        const query = `SELECT * FROM publicaciones WHERE id= ${connection.escape(req.params.id)}`
        connection.query(query, function(error, filas, campos) {
            if(filas.length > 0){
                res.json({data: filas[0]})
            }else{
                res.status(404)
                res.send({errors: ["No se encuentra esa publicacion"]})
            }
        })
        connection.release()
    }) 
})
// GET /api/v1/autores
app.get('/api/v1/autores', function(req, res){
    pool.getConnection(function (err, connection){
        const query = 'SELECT * FROM autores'
        connection.query(query, function(error, filas, campos){
            if(filas.length > 0){
                res.status(200)
                res.json({data:filas})
            }else{
                res.status(404)
                res.send({errors: "No se encuentra la tabla", mysql : error})
            }
            
        })
        connection.release()
    })
})

//GET /api/v1/autores/<id> FALTA MOSTRAR PUBLICACIONES CON EL ID Y VALIDAR

app.get('/api/v1/autores/:id', function(req, res){
    pool.getConnection(function(err, connection){
        const query = `SELECT * FROM autores WHERE id=${connection.escape(req.params.id)}`
        connection.query(query, function(error, filas, campos){
            if(filas.length > 0){
                let datos = {data:filas[0]}
                const queryCon = `SELECT * FROM publicaciones WHERE autor_id=${connection.escape(datos.data.id)}`
                connection.query(queryCon, function(error, filas, campos){
                        res.json({data: filas, autor: datos})
                })
                
            }else{
                res.status(404)
                res.send({errors: ["No se encuentra un autor con ese id"]})
            }
        })
        connection.release()
    })
})

//POST /api/v1/autores CREAR UN USUARIO
app.post('/api/v1/autores', function(req, res){
    pool.getConnection(function(err,connection){
        const query = `INSERT INTO autores (email, contrasena, pseudonimo) VALUES (${connection.escape(req.query.email)}, ${connection.escape(req.query.contrasena)}, ${connection.escape(req.query.pseudonimo)})`
        connection.query(query, function(error, filas, campos){
            const nuevoId = filas.insertId
            const queryConsulta = `SELECT * FROM autores WHERE id= ${connection.escape(nuevoId)}`
            connection.query(queryConsulta, function(error, filas, campos){
                res.status(201)
                res.json({data: filas[0]})
            })
        })
        connection.release()
    })
})

//POST /api/v1/publicaciones?email=<email>&contrasena=<contrasena>
app.post('/api/v1/publicaciones', function(req, res){
pool.getConnection(function(err,connection){
    const query = `SELECT * FROM autores WHERE email=${connection.escape(req.query.email)} AND contrasena=${connection.escape(req.query.contrasena)}`
    connection.query(query,function(error, filas, campos){
        if(filas){
            var data = {datos:filas[0]}
                const query3 = `INSERT INTO publicaciones (titulo, resumen, contenido, autor_id) VALUES ('Prueba', 'resumen','resumen', ${connection.escape(data.datos.id)})`
                connection.query(query3, function(error, filas, campos){
                   var inId = filas.insertId
                   const queryConsult = `SELECT * FROM publicaciones WHERE id=${connection.escape(inId)}`
                   connection(queryConsult, function(error, filas, campos){
                       res.status(200)
                       res.json({data:filas[0]})
                   })
                })
            }else{

                res.status(404)
                res.send({errors: "No existe el usuario"})
            }
    })
})
})


// DELETE /api/v1/publicaciones/<id>?email=<email>&contrasena=<contrasena>
app.delete('/api/v1/publicaciones/:id', function(req, res){
    console.log(req.params.id)
    console.log(req.query.email)
pool.getConnection(function(err, connection){
    const query = `SELECT * FROM autores WHERE email= ${connection.escape(req.query.email)} AND contrasena=${req.query.contrasena}`
    connection.query(query, function(error, filas, campos){
        if(filas.length > 0){
            let selec = filas[0]
            const query2 = `DELETE FROM publicaciones WHERE id=${selec.id}`
            connection.query(query2, function(error, filas, campos){
                res.status(204)
                res.json()
            })
        }else{
            res.status(404)
            res.send({errors: "No se encuentra la tarea publicada"})
        }
    })
})
})


app.listen(3000, function(){
    console.log("Servidor iniciado")
  })