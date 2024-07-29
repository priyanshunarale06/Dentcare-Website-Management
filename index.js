var express = require("express")
var bodyparser = require("body-parser")
var upload = require("express-fileupload")
var session = require("express-session")
var userRoute = require("./routes/user")
var adminRoute = require("./routes/admin")
var app = express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(upload())
app.use(session({
    secret:"jerry",
    resave:true,
    saveUninitialized:true
}))
app.use(express.static("public/"))

app.use("/",userRoute)
app.use("/admin",adminRoute)

app.listen(1000)