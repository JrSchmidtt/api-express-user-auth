var bodyParser = require('body-parser')
var express = require("express")
var router = require("./routes/routes")
var app = express()
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/",router);

app.listen(8080,() => {
    console.log("Server Running..")
});
