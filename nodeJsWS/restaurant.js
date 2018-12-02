

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


//getting topraded Restaurants

app.get("/web_services/topratedRestaurants",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY rating DESC LIMIT 6"
      
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



    //getting most tasty Restaurants

app.get("/web_services/mosttasty",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC LIMIT 6"
      
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


    //getting all topraded Restaurants

app.get("/web_services/alltopratedRestaurants",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY rating DESC "
      
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



    //getting most tasty Restaurants

app.get("/web_services/mosttasty",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC LIMIT 6"
      
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


    //getting All most tasty Restaurants

app.get("/web_services/allmosttasty",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC "
      
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


    //getting better services Restaurants

app.get("/web_services/bestservices",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingS DESC LIMIT 6"
      
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



    //getting All better services Restaurants

app.get("/web_services/allbestservices",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingS DESC "
      
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