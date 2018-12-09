

const express = require('express')
const body_parcer = require('body-parser')
const mysql = require('mysql')
const mssql = require('mssql')
const app = express()
const router = express.Router()


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "espritlaunch",
    port: '3306',
    password: "root"
})

//middleware for script
app.use(body_parcer.json())



//intializing server
var server = app.listen(3004, function(){

    console.log("app is listening on port 3004")


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

app.post("/web_services/insert",function(req,res){


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database:'espritlaunch',
    port: '3306'

    

  })
  
    
    
  connection.query("INSERT INTO user(id, nom, prenom, datenaissance, mail,image_url) VALUES (?, ?, ?, ?, ?, ?)", [
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

app.post("/web_services/check",function(req,res){


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database:'espritlaunch',
        port: '3306'
    
        
    
      })
      
        connection.query("SELECT * FROM user WHERE id = ?", [req.body.id], (err, rows, fields) => { 
            if(!err){
                console.log(rows.length)
                if(rows.length == 0){
                    connection.query("INSERT INTO user(id, nom, prenom, mail,image_url) VALUES (?, ?, ?, ?, ?)", [
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
module.exports = router