const express = require('express');
var sqlite3 = require('sqlite3').verbose()
const cors = require('cors');

const dbname = 'malaria.db'

//create express app
const app = express();

//Server port
var PORT = 8000 

// create database
let db = new sqlite3.Database(dbname,err => {
    if(err)
        throw err
    console.log('Database stated on malaria.db')
});


// Start server
app.listen(PORT, () => {
    console.log('port is listening');
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello world');
    res.json({"message":"Ok"});
})

//close the database
db.close();