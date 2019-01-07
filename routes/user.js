

const express = require('express')
const body_parcer = require('body-parser')
const mysql = require('mysql')
const mssql = require('mssql')
const notificationUtil = require("../utils/NotificationHelper")
const notificationType = require("../models/notificationT")
const app = express()
const formidable = require('formidable')
var fs = require('fs');


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
                                    manageDevices(req, res, rows[0])

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
                    pool.query("UPDATE user SET(email = ?, username = ?, image_url = ?) WHERE id = ?", [req.body.email, req.body.username, req.body.imageurl, req.body.id], (er) => {
                        if (!err) {
                            pool.query("SELECT * FROM user WHERE id = ?", [req.body.id], (err, rows, fields) => {
                                if (!err) {
                                    manageDevices(req, res, rows[0])
                                } else {
                                    res.status(500)
                                    res.json("Error getting user after insert")
                                }
                            })
                        } else {
                            res.status(500)
                            res.json("Error updating user")
                        }
                    })
            }

    
                        }
                    
                
                
            
            else{
                res.status(500)
            res.json("error in selecting user")

              
            }
        })
    })


    function manageDevices(req, res, user) {
        pool.query("SELECT * FROM devices WHERE id_user = ?", [user.id], (devErr, devRows) => {
            if (!devErr) {
                if (devRows.length != 0 && devRows[0].token != req.body.token) {
                    pool.query("UPDATE devices SET token = ? WHERE id_user = ?", [req.body.token, user.id], (err, rows) => {
                        res.status(200)
                        res.json(user)
                        console.log("done")
                    })
                }else{
                    pool.query("INSERT INTO devices VALUES(?,?,?,?)", [req.body.uuid, user.id, req.body.token, req.body.type], (err, rows) => {
                        if(err){
                            console.log(err)
                        }
                        console.log(req.body.uuid)
                        console.log(req.body.token)
                        console.log(devRows.length)
                        res.status(200)
                        res.json(user)
                    })
                }
            } else {
                res.sendStatus(500)
                console.log(devErr)
            }
        })
    }
        
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



    //get user by id

    router.get("/:id", (req, res) => {
        pool.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows, fields) => {
            res.status(200)
            res.json(rows[0])
        })
    })

    //logout and delete uuid

    router.post("/logout", (req, res) => {
        console.log("logout")
        pool.query("DELETE FROM devices WHERE uuid = ?", [req.body.uuid], (err, rows) => {
            res.sendStatus(200)
        })
    })

    //update photo couverture

    router.post("/update_photo", (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const userId = fields.user_id
            var oldpath = files.image.path
            var newFileName = uuidv4() + ".png"
            var newpath = './public/images/profile/' + newFileName
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                    return
                }
                pool.query("SELECT image_url FROM user WHERE id = ?", [userId], (err, rows) => {
                    let oldImageUrl = null
                    if(!err){
                        oldImageUrl = rows[0].image_url
                        oldImageUrl = oldImageUrl.replace(/http.*3000/, ".")
                    }
                    if(oldImageUrl != null && fs.existsSync(oldImageUrl)) fs.unlinkSync(oldImageUrl)
                    const ipAddress = "10.0.2.2"
                    const imageURL = "http://" + ipAddress + ":3000/public/images/profile/" + newFileName
                    pool.query("UPDATE user SET image_url = ? WHERE id = ?", [imageURL, userId], (err) => {
                        if (err) {
                            console.log(err)
                            res.sendStatus(500)
                            fs.unlinkSync(newpath)
                            return
                        }
                        res.status(200)
                        res.json(imageURL)
                    })
                })
            })
        })
    })


    //update radius 


    //update name 

    //update prenom


    //update phone 
    
module.exports = router