const express = require('express');
const sqlite3 = require('sqlite3');

const dbname = 'malaria.db'

const app = express();

let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE ,err => {
    if(err)
        throw err
    console.log('Database stated on malaria.db')
});

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(8000, () => {
    console.log('port is listening');
});



db.close();