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


//follow


router.post("/follow/:follower_id/:followed_id", (req, res) => {
    pool.query("INSERT INTO following(follower_id, followed_id) VALUES(?,?)", [req.params.follower_id, req.params.followed_id], (err, rows, fields) => {
        if (!err) {
           /* pool.query("SELECT * FROM user WHERE id = ?", [req.params.follower_id], (usErr, usRows) => {
                if (!usErr) {
                    const notifUser = usRows[0]
                    pool.query("SELECT * FROM devices WHERE user_id = ?", [req.params.followed_id], (devErr, devRows) => {
                        devRows.forEach(device => {
                            notificationUtil.notify(notificationType.getKey("follower"), req.params.follower_id, device.token, notifUser.username + " is following you",
                                notifUser.username + " just started following you, click here to check his profile!")
                        });
                    })
                }
            })*/
            pool.query("UPDATE user SET following = following+1 WHERE id = ?", [req.params.follower_id])
            pool.query("UPDATE user SET followers = followers+1 WHERE id = ?", [req.params.followed_id])
            res.status(204)
            res.end()
        } else {
            res.sendStatus(500)
            console.log(err)
        }
    })
})


//unfollow

router.delete("/unfollow/:follower_id/:followed_id", (req, res) => {
    pool.query("DELETE FROM following WHERE follower_id = ? AND followed_id = ?", [req.params.follower_id, req.params.followed_id], (err, rows, fields) => {
        if (rows.affectedRows != 0) {
            pool.query("UPDATE user SET following = following-1 WHERE id = ?", [req.params.follower_id])
            pool.query("UPDATE user SET followers = followers-1 WHERE id = ?", [req.params.followed_id])
        }
        res.sendStatus(204)
    })
})




//list followers
router.get("/following_list/:id", (req, res) => {
    pool.query("SELECT u.* FROM following f JOIN user u ON f.followed_id = u.id WHERE f.follower_id = ? ", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.send(rows)
    })
})


//listfollowings


router.get("/follower_list/:id", (req, res) => {
    pool.query("SELECT u.* FROM following f JOIN user u ON f.follower_id = u.id WHERE f.followed_id = ?", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.send(rows)
    })
})

// check user following or not

router.get("/is_following/:id1/:id2", (req, res) => {
    pool.query("SELECT f.* FROM following f JOIN user u ON f.follower_id = u.id WHERE f.follower_id = ? AND f.followed_id = ?", [req.params.id1, req.params.id2], (err, rows) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.send(rows.length > 0 ? true : false)
    })
})
module.exports = router