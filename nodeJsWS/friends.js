const express = require('express')
const body_parcer = require('body-parser')
const mysql = require('mysql')
const mssql = require('mssql')
const app = express()


//middleware for script
app.use(body_parcer.json())

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


//intializing server
var server = app.listen(3003, function(){

    console.log("app is listening on port 3003")


})

//Initiallising connection string
var dbConfig = {
    host : 'localhost',
    user : "root",
    password : "root",
    port:'8888',
    database :"espritlaunch"
};


//getting friends List

app.get("/web_services/friends",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM user WHERE id in (SELECT id_friend FROM friends)"
      
      connection.query(queryString,[req.params.id],(err,rows,fields)=>{
          
        if(err){
            console.log("error while fteching query")
            res.send(err)
        }
        else{
            res.status(200)
            res.json(rows)
        }
        
      
    
    })
    })


