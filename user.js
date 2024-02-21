var express = require('express')
var app = express()

var fs = require('fs')
var bodyParser = require('body-parser')

var urlEncoded = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    res.send("start my server")
})

app.get('/listUsers', function (req, res) {
    var data = fs.readFileSync(__dirname + "/user.json") //as byte
    res.send(String(data))
})

app.get('/user/:id', function (req, res) {

    var arr = ["1", "2", "3"]
    if (arr.includes(String(req.params.id))) {
        var data = fs.readFileSync(__dirname + "/user.json") //as byte
        data = JSON.parse(String(data))
        console.log(data)
        var user = data['user' + req.params.id]
        console.log(user)

        res.send(user)
    }
    else {
        res.send("user id error")
    }

})

app.get('/deleteUser/:id', function (req, res)  ///postman

{
    var arr = ["1", "2", "3"]
    if (arr.includes(String(req.params.id))) {
        var data = fs.readFileSync(__dirname + "/user.json") //as byte
        data = JSON.parse(String(data))
        // var user = data['user'+req.params.id]
        delete data['user' + req.params.id]
        res.send(data)
    }
    else {
        res.send("user id error")
    }
})
app.get('/form', function (req, res) {
    res.sendFile(__dirname + '/form.html')
})

app.post('/addUser', urlEncoded, function (req, res) ///postman 

{
    var newUser = { name: "", password: "", profession: "" }
    newUser.name = req.body.name
    newUser.password = req.body.password
    newUser.jop = req.body.jop
    var data = fs.readFileSync(__dirname + "/user.json") //as byte
    data = JSON.parse(String(data))
    data['user4'] = newUser
    res.send(data)

})

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
})