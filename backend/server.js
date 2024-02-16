const express = require('express');
var sqlite3 = require('sqlite3').verbose()
const cors = require('cors');
const bodyParser = require('body-parser');

const dbname = 'malaria.sqlite'

//create express app
const app = express();

// Ajoutez body-parser comme middleware global
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
                    db.run(insert, [40.7128, -74.0060, new Date().toISOString(), true])
                    db.run(insert, [42.7128, -104.0060, new Date().toISOString(), false])

                }
            });
    }


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
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

//endpoint get element by id
app.get("/api/declaration/:id", (req, res, next) => {
    var sql = "SELECT * FROM Declarations WHERE id = ?"
    db.all(sql, req.params.id, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
})



//endpoint insert new declaration
app.post("/api/declaration", (req, res) => {
    var errors = []

    if (!req.body['latitude']) {
        errors.push("latitude is missing");
    }
    if (!req.body['longitude']) {
        errors.push("Longitude is missing");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    var data = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        DateCreation: new Date().toISOString(),
        valid: true
    }

    var query = 'INSERT INTO Declarations (latitude, longitude, DateCreation, valid) VALUES (?,?,?,?)'
    var params = [data.latitude, data.longitude, data.DateCreation, data.valid]

    db.run(query, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    })
})


// endpoint to update an existing record
app.patch("/api/declarations/:id", (req, res, next) => {
    var data = [req.body['latitude'], req.body['longitude'], new Date().toISOString(), req.params.id];

    let query = `UPDATE Declarations SET 
               latitude = ?, 
               longitude = ?, 
               dateCreation = ?
               WHERE id = ?`;

    db.run(query, data, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        console.log(`Row(s) updated: ${this.changes}`);
        res.json({
            message: "success",
            data: data,
            changes: this.changes
        });
    });
})




// Endpoint pour récupérer les déclarations créées entre hier (exclus) et aujourd'hui
app.get("/api/declarations/today", (req, res) => {
    // Date d'hier
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Date d'aujourd'hui
    const today = new Date();

    console.log("date", yesterday)

    // Requête SQL pour récupérer les déclarations entre hier (exclus) et aujourd'hui
    let query = `SELECT * FROM Declarations 
                 WHERE dateCreation >= ? AND dateCreation < ?`;

    db.all(query, [yesterday.toISOString(), today.toISOString()], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.json(rows);
    });
});


// Endpoint pour récupérer les déclarations créées entre hier (exclus) et aujourd'hui
app.get("/api/declarations/todayNb", (req, res) => {
    // Date d'hier
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Date d'aujourd'hui
    const today = new Date();

    // Requête SQL pour récupérer le nombre de déclarations entre hier (exclus) et aujourd'hui
    let query = `SELECT count(*) FROM Declarations 
                 WHERE dateCreation >= ? AND dateCreation < ?`;

    db.all(query, [yesterday.toISOString(), today.toISOString()], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.json(rows);
    });
});


// Start server
app.listen(PORT, () => {
    console.log('port is listening on port ',PORT );
});

//close the database
//db.close();