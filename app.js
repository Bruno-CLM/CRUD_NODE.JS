                //buscando o express para o meu sistema - biblioteca
const express = require('express');
                //buscando o body-parser para o meu sistema - biblioteca
const bodyParser = require('body-parser');
                //buscando o mysql para o meu sistema - biblioteca
const mysql = require('mysql');
                //buscando o handler-bars para o meu sistema - biblioteca
const handlebars = require('express-handlebars');

const urlEncodeParser = bodyParser.urlencoded({extended:false});

// Conexão com banco de dados
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456Br',
    port: 3306
});

// Indico o banco que desejo utilizar
sql.query('use nodejs');


const app = express();

//Template engine 
app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// CSS
//app.use('/css', express.static('css'));

// JS
//app.use('/js', express.static('js'));

// IMG
app.use('/img', express.static('img'));


//Routes and templates
app.get("/", function (req, rsp) {
    //rsp.send("Página inicial")
    //rsp.sendFile(__dirname + "/index.html")
    rsp.render('index');
    //console.log(req.params.id)
});

app.get('/script', function(req, rsp){
    rsp.sendFile(__dirname + '/js/script.js')
});

app.get('/style', function(req, rsp){
    rsp.sendFile(__dirname + '/css/style.css')
});

app.get('/inserir', function(req, rsp){
    rsp.render('inserir');
})

app.get('/select:id?', function(req, rsp){
    if(!req.params.id){
        sql.query('select * from user order by id asc', function(err, results, fields){
            rsp.render('select', {data: results});
        })
    }else {
        sql.query('select * from user where id=? order by id asc',[req.params.id], function(err, results, fields){
            rsp.render('select', {data: results});
        })
    }
})

app.post('/controllerForm', urlEncodeParser, function(req, rsp){
    sql.query('insert into user values (0, ?, ?)', [req.body.name, req.body.age]);
    rsp.render('controllerForm', {name: req.body.name});
})

app.get('/deletar/:id', function(req, rsp){
    sql.query('delete from user where id = ?', [req.params.id]);
    rsp.render('deletar');
})

app.get('/update/:id', function(req, rsp){
    sql.query('select * from user where id = ?', [req.params.id],function(err, results, fields){
        rsp.render('update', {id: req.params.id, name: results[0].name, age: results[0].age});
    });
    
})

app.post('/controllerUpdate', urlEncodeParser, function(req, rsp){
    sql.query('update user set name=?,age=? where id=?', [req.body.name, req.body.age, req.body.id]);
    rsp.render('controllerUpdate');
})

app.listen(3000, function (req, rsp) {
    console.log("Servidor is running in port 3000")
})