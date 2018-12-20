const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/public", express.static(path.join(__dirname, 'public')))

const userRoute = require("./routes/user")
const restaurantRoute = require("./routes/restaurant.js")
const friendRoute = require("./routes/friends.js")
const cafeRoute = require('./routes/cafe.js')

app.use("/users", userRoute)
app.use("/restaurants", restaurantRoute)
app.use("/friends", friendRoute)
//app.use('/cafes', cafeRoute)

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003...")
})