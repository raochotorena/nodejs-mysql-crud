const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
})

app.listen(3000,() => console.log('Express server is running at port no: 3000'));

//Get all Items
app.get('/items', (req,res) => {
    mysqlConnection.query('SELECT * FROM items',(err, rows, fields) => {
        if(!err)
            console.log(rows);
        else
            console.log(err);

    })
});

//Get an item using id
app.get('/items/:id', (req,res) => {
    mysqlConnection.query('SELECT * FROM items WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an item using id
app.delete('/items/:id', (req,res) => {
    mysqlConnection.query('DELETE FROM items WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send('Item has been deleted');
        else
            console.log(err);
    })
});

//Insert an item using id
app.post('/items', (req,res) => {
    let item = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount = ?; \
    CALL AddUpdateItems(@id,@name,@qty,@amount);";

    mysqlConnection.query(sql, [item.id, item.name, item.qty, item.amount],(err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted new item: ' + element[0].name);
            })
        else
            console.log(err);
    })
});

//Update an item using id
app.put('/items', (req,res) => {
    let item = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount = ?; \
    CALL AddUpdateItems(@id,@name,@qty,@amount);";

    mysqlConnection.query(sql, [item.id, item.name, item.qty, item.amount],(err, rows, fields) => {
        if(!err)
            res.send("Item updated successfully")
        else
            console.log(err);
    })
});