const express = require('express');
var sqlite3 = require('sqlite3').verbose()
const cors = require('cors');

const dbname = 'malaria.sqlite'

//create express app
const app = express();

//Server port
var PORT = 8000

// create database
let db = new sqlite3.Database(dbname, err => {
    if (err) {
        throw err

    }
    else {
        console.log('Database started on malaria.sqlite')
        db.run(`CREATE TABLE Declarations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, DateCreation DATE,valid BOOLEAN)`,
            err => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO Declarations (latitude, longitude, DateCreation, valid) VALUES (?,?,?,?)'
                    db.run(insert, [40.7128, -74.0060, Date('now'), true])
                    db.run(insert, [42.7128, -104.0060, Date('now'), false])

                }
            });
    }


});


// Start server
app.listen(PORT, () => {
    console.log('port is listening');
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello world');
    res.json({ "message": "Ok" });
})

//endpoint to get all declarations
app.get("/api/declarations", (req, res, next) => {
    var sql = "SELECT * FROM Declarations"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

//endpoint get element by id
app.get("/api/declaration/:id", (req, res, next) => {
    var sql = "SELECT * FROM Declarations WHERE id = ?"
    db.all(sql, req.params.id, (err, rows) => {
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data" : rows
        })
    });
})



//endpoint insert new declaration
app.post("/api/declaration", (req,res) => {
    var errors = []

    if(!req.body.latitude){
        errors.push("latitude is missing");
    }
    if(! req.body.longitude){
        errors.push("Longitude is missing");
    }
    if(errors.length){
        res.status(400).json({"error": errors.join(",")});
        return;
    }

    var data = {
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        DateCreation : Datet('now'),
        valid : true
    }

    var query = 'INSERT INTO Declarations (latitude, longitude, DateCreation, valid) VALUES (?,?,?,?)'
    var params = [data.latitude, data.longitude, data.DateCreation, data.valid]

    db.run(query, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    })
})

//close the database
//db.close();