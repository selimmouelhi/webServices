

const express = require('express')
const body_parcer = require('body-parser')
const mysql = require('mysql')
const mssql = require('mssql')
const app = express()
const router = express.Router()



//Initiallising connection string
var dbConfig = {
    host : 'localhost',
    user : "root",
    password : "root",
    port:'8888',
    database :"espritlaunch"
};


const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "espritlaunch",
    port: 3306,
    password: "root"
})

function getConnection(){
    return pool
}


//getting topraded Restaurants

router.get("/topratedRestaurants",function(req,res){


   
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY rating DESC LIMIT 6"
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/mosttasty",function(req,res){


    
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC LIMIT 6"
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/alltopratedRestaurants",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY rating DESC "
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/mosttasty",function(req,res){


   
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC LIMIT 6"
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/allmosttasty",function(req,res){


     
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingTasty DESC "
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/bestservices",function(req,res){


   
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingS DESC LIMIT 6"
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

router.get("/allbestservices",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      var queryString = "SELECT * FROM restaurant ORDER BY ratingS DESC "
      
      pool.query(queryString,[req.params.id],(err,rows,fields)=>{
          
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

    module.exports = router