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
var server = app.listen(3005, function(){

    console.log("app is listening on port 3005")


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

app.get("/web_services/friends/:id",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
      
        
      

      
      
      connection.query( "SELECT * FROM user INNER JOIN friends ON user.id=friends.id_user And friends.id_user=?",
        [   
          req.params.id
    
        ],(err,rows,fields)=>{
          
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

    app.post("/web_services/addfriend",function(req,res){


        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root', 
            database:'espritlaunch',
            port: '3306'
        
            
        
          })
          
          
            
          connection.query("INSERT INTO friends(id_friend, id_user) VALUES (?, ?)", [
            req.body.id_friend,
            req.body.id_user
            ], (err, rows, fields) => {
              
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



        //delete user by id 

        app.delete("/web_services/deletefriend",function(req,res){


            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root', 
                database:'espritlaunch',
                port: '3306'
            
                
            
              })
              
              
                
              connection.query("DELETE FROM friends WHERE id_user=? AND  id_friend=?", [
                req.body.id_user,
                req.body.id_friend
                ], (err, rows, fields) => {
                  
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
            
        
    //SELECT * FROM user INNER JOIN friends ON user.id=friends.id_user And friends.id_user="f_2308446465863370"


