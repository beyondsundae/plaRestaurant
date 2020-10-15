const express = require("express");
const mysql = require("mysql");
const http = require("http");
const port = process.env.PORT || 4000

const app = express();

const cors = require("cors")
const server = http.createServer(app)
const bodyParser = require('body-parser');
const { stat } = require("fs");

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

app.get('/BuddhFood', (req, res)=>{
    connection.query("SELECT * FROM buddh_food", (err, result, fields)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})
app.get('/IslamFood', (req, res)=>{
    connection.query("SELECT * FROM islam_food", (err, result, fields)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

app.post('/sendOrder', (req, res)=>{
    console.log("Insert Done")
    let data = {
        Timestamp:req.body.Timestamp,
        totalPrice:req.body.totalPrice,
        statusCook:"NotDone",
        EatStatus:req.body.EatStatus,
        TableNumber:req.body.TableNumber,
        ข้าวสวย:req.body.ข้าวสวย?req.body.ข้าวสวย:0,
        ข้าวผัดไก่:req.body.ข้าวผัดไก่?req.body.ข้าวผัดไก่:0,
        ข้าวกะเพราไก่สับ:req.body.ข้าวกะเพราไก่สับ?req.body.ข้าวกะเพราไก่สับ:0,
        ข้าวผัดพริกแกงไก่:req.body.ข้าวผัดพริกแกงไก่?req.body.ข้าวผัดพริกแกงไก่:0,
        ข้าวไก่ผัดผงกะหรี่:req.body.ข้าวไก่ผัดผงกะหรี่?req.body.ข้าวไก่ผัดผงกะหรี่:0,
        ข้าวทะเลผัดผงกะหรี่:req.body.ข้าวทะเลผัดผงกะหรี่?req.body.ข้าวทะเลผัดผงกะหรี่:0,
        ข้าวต้มไก่:req.body.ข้าวต้มไก่?req.body.ข้าวต้มไก่:0,
        ข้าวไข่เจียว:req.body.ข้าวไข่เจียว?req.body.ข้าวไข่เจียว:0,
        ข้าวไก่ทอด:req.body.ข้าวไก่ทอด?req.body.ข้าวไก่ทอด:0,
        ข้าวผัดหมู:req.body.ข้าวผัดหมู?req.body.ข้าวผัดหมู:0,
        ข้าวกะเพราหมูสับ:req.body.ข้าวกะเพราหมูสับ?req.body.ข้าวกะเพราหมูสับ:0,
        ข้าวผัดพริกแกงหมู:req.body.ข้าวผัดพริกแกงหมู?req.body.ข้าวผัดพริกแกงหมู:0,
        ข้าวผัดพริกแกงหมูกรอบ:req.body.ข้าวผัดพริกแกงหมูกรอบ?req.body.ข้าวผัดพริกแกงหมูกรอบ:0,
        ข้าวหมูผัดผงกะหรี่:req.body.ข้าวหมูผัดผงกะหรี่?req.body.ข้าวหมูผัดผงกะหรี่:0,
        ข้าวต้มหมู:req.body.ข้าวต้มหมู?req.body.ข้าวต้มหมู:0,
        ข้าวไข่เจียวหมูสับ:req.body.ข้าวไข่เจียวหมูสับ?req.body.ข้าวไข่เจียวหมูสับ:0
    }

    let sql = "INSERT INTO ordertable SET ?"
        connection.query(sql, data, (err, result)=>{
            if(err){
                throw err
            }else{
                console.log(result)
            }
        })
})

app.get('/Data', (req, res)=>{
    connection.query("SELECT * FROM ordertable", (err, result, fields)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    }
)
})

app.put("/AcceptOrder", (req, res)=>{
    let OrderCook = req.body.OrderCook
    let statusCook = req.body.statusCook
    connection.query("UPDATE ordertable SET statusCook = ? WHERE OrderCook = " + OrderCook , [statusCook], (err, result, fields)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    } )
})

app.get('/ActiveKey', (req, res)=>{
    connection.query("SELECT orderCook FROM ordertable WHERE statusCook = 'NotDone' LIMIT 1", (err, result, fields)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    }
)
})


module.export = app