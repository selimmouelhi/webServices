const express = require('express')
const body_parcer = require('body-parser')
const mysql = require('mysql')
const mssql = require('mssql')
const app = express()

const router = express.Router()

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






//getting friends List

router.get("/getfriends/:id",function(req,res){


   
      
      
        
      

      
      
      pool.query( "SELECT user.id,user.nom,user.prenom,user.mail,user.phone,user.image_url FROM user INNER JOIN friends ON user.id=friends.id_friend And friends.id_user=?",
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

    //add friend

    router.post("/addfriend/:id_user/:id_friend",function(req,res){


        
          
          
            
          pool.query("INSERT INTO friends(id_friend, id_user) VALUES (?, ?)", [
            req.params.id_user,
            req.params.id_friend
            ], (err, rows, fields) => {
              
            if(err){
                console.log("error while fteching query")
                res.send(err)
            }
            else{
                pool.query("UPDATE user SET friends = friends+1 WHERE id = ?", [req.params.id_user])
                pool.query("UPDATE user SET friends = friends+1 WHERE id = ?", [req.params.id_friend])
                res.send(req.params.nom)
                console.log("done")
            }
            
          
        
        })
        })



        //delete user by id 

        router.delete("/deletefriend/:id_user/:id_friend",function(req,res){


           
              
              
                
              pool.query("DELETE FROM friends WHERE id_user=? AND  id_friend=?", [
                req.params.id_user,
                req.params.id_friend
                ], (err, rows, fields) => {
                  
                if(err){
                    console.log("error while fteching query")
                    res.send(err)
                }
                else{
                    console.log(req.params.id_user)
                    console.log(req.params.id_friend)

                    res.send(req.params.nom)
                    console.log("done")
                }
                
              
            
            })
            })
            

            // get followers 
/*
            router.get("/friends/:id",function(req,res){


                const connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'root', 
                    database:'espritlaunch',
                    port: '3306'
                
                    
                
                  })
                  
                  
                    
                  
            
                  
                  
                  pool.query( "SELECT user.id,user.nom,user.prenom,user.mail,user.phone,user.image_url FROM user INNER JOIN followers ON user.id=friends.id_friend And friends.id_user=?",
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
*/

            //get following 
/*
            app.get("/web_services/friends/:id",function(req,res){


                const connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'root', 
                    database:'espritlaunch',
                    port: '3306'
                
                    
                
                  })
                  
                  
                    
                  
            
                  
                  
                  connection.query( "SELECT user.id,user.nom,user.prenom,user.mail,user.phone,user.image_url FROM user INNER JOIN friends ON user.id=friends.id_friend And friends.id_user=?",
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
*/
            //add follower 

            //delete follower 
        
    //SELECT * FROM user INNER JOIN friends ON user.id=friends.id_user And friends.id_user="f_2308446465863370"


    module.exports = router

