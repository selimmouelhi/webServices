

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

//creating and exectuing query 

var executeQuery = function(res,query){

    mssql.connect(dbConfig,function(err){

            if(err){
                console.log("Error while connecting database :- " + err);
                res.send(err)
            }
            else
            {
                var request = new mssql.request()
                request.query(query,function(err,res){

                        if(err){
                            console.log("Error while querying database :- " + err);
                            res.send(err)
                        }
                        else{
                            console("fetching query successfully")
                            res.send(res)
                        }

                })
            }

    })
    mssql.close()

}

//insertion user

app.get("/web_services/:name&:prenom&:date&:email",function(req,res){


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database:'espritlaunch',
    port: '3306'

    

  })
  
  c
    
  var queryString = "INSERT INTO user (nom,prenom,datenaissance,mail) VALUES (' " + req.params.nom + " ',' " + req.params.prenom + " ',' " + req.params.date + "',' " + req.params.email + " ')";
  connection.query(queryString,[req.params.id],(err,rows,fields)=>{
      
    if(err){
        console.log("error while fteching query")
        res.send(err)
    }
    else{
        res.send(req.params.nom)
        console.log("done")
    }
    
  

})
})

