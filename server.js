const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const fs = require('fs');
const data = fs.readFileSync('./database.json')
const conf =JSON.parse(data);


var mysql = require('mysql')
var conn = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password :conf.password,
  database : conf.database

})

conn.connect();


app.get('/api/home',(req, res)=>{
   conn.query(
       "select * from products",
       (err, rows, fields) =>{
           res.send(rows)
       }
   )
})

app.post('/api/sales',(req, res) =>{
    let sql = 'update products set stock=stock-1 where barcode=?';
    let barcode = req.body.barcode;
    conn.query(
        sql, barcode,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

app.post('/api/storage/:id',(req, res)=>{
    let sql='update products set stock=? where id=?'
    let stock = req.body.stock
    let id = req.body.id
    let params = [stock, id]

    console.log(id, stock)

    conn.query(sql, params, 
        (err, rows, fields) =>{
            res.send(rows)
        } 
    )
})

app.listen(port, ()=>console.log(`listening port....${port}`))
