const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
})

app.listen(3000,() => console.log('Express server is running at port no: 3000'));

app.get('/inventory', (res,req) => {
    mysqlConnection.query('SELECT * FROM inventory',(err, rows, fields) => {
        if(!err)
            console.log(rows);
        else
            console.log(err);
    })

});