const express = require("express");
const mysql = require("mysql");
const http = require("http");
const port = process.env.PORT || 4000

const app = express();

const cors = require("cors")
const server = http.createServer(app)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.listen(port, ()=>{
    console.log("Starting on PORT", port)
})
app.use(cors({
    origin:"*",
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentails : true
}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pla-res'
})

connection.connect(function(err){
    console.log('Connected to DB')
})

app.get('/', (req, res) => {
    res.send("Hello 4000")
})

app.get('/Data', (req, res)=>{
    connection.query("SELECT * FROM ordertable",function(err, result, fields){
        if(err) throw err
            res.send(result)
    }
)
})

module.export = app