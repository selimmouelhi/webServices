

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

//middleware for script




   

//insertion user

router.post("/insert",function(req,res){



 
  
    
    
  pool.query("INSERT INTO user(id, nom, prenom, datenaissance, mail,image_url) VALUES (?, ?, ?, ?, ?, ?)", [
    req.body.id,
    req.body.nom,
    req.body.prenom,
    req.body.datenaissance,
    req.body.mail,
    req.body.image_url
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

//creating user with router

/*router.post("/web_services/insert", (req, res) => {
    
    pool.query("INSERT INTO user(id, nom, prenom, datenaissance, mail,image_url) VALUES (?, ?, ?, ?, ?, ?)", [
        req.body.id,
        req.body.nom,
        req.body.prenom,
        req.body.datenaissance,
        req.body.mail,
        req.body.image_url
        ], (err, rows, fields) => {
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            console.log("t3adina")
            res.status(200)
            res.json(res.body)
        })
})
*/


//check user , if he doesn't exist add him 

router.post("/check",function(req,res){


  
      
        pool.query("SELECT * FROM user WHERE id = ?", [req.body.id], (err, rows, fields) => { 
            if(!err){
                console.log(rows.length)
                if(rows.length == 0){
                    pool.query("INSERT INTO user(id, nom, prenom, mail,image_url) VALUES (?, ?, ?, ?, ?)", [
                        req.body.id,
                        req.body.nom,
                        req.body.prenom,
                        req.body.mail,
                        req.body.image_url
                        ], (err, rows, fields) => {
                          
                        if(!err){
                            pool.query("SELECT * FROM user WHERE id = ?", [req.body.id], (err, rows, fields) => {
                                if(!err){
                                    res.status(200)
                                    res.json(rows[0])
                                }
                                else{
                                    res.status(500)
                                res.json("Error getting user after insert")

                                }
                            })
                        }
                        else{
                            res.status(500)
                            res.json("Error getting user after insert")
                        }
                        
                })
            }
       
                else{
                   res.json(rows[0])
            }

    
                        }
                    
                
                
            
            else{
                res.status(500)
            res.json("error in selecting user")

              
            }
        })
    })

        
     /* connection.query("INSERT INTO user(id, nom, prenom, datenaissance, mail,image_url) VALUES (?, ?, ?, ?, ?, ?)", [
        req.body.id,
        req.body.nom,
        req.body.prenom,
        req.body.datenaissance,
        req.body.mail,
        req.body.image_url
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
    })*/



    // get list abonnements 


    
module.exports = router