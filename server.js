const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Pool } = require("pg");

const apiOSM = "https://nominatim.openstreetmap.org/reverse?format=json&lat=5.40&lon=10.113932&zoom=18&addressdetails="

//connection into database
const pool = new Pool({
    user: "i2hm",
    database: "malariai2hm",
    password: "projetS10INFO5",
    port: 5432,
    host: "localhost",

});

/*
async function retrieveData() {
    try {
        const res = await pool.query("SELECT * FROM declarations");
        console.log(res.rows);
        console.log("OK");
    } catch (error) {
        console.error(error);
    }
}
*/


//retrieveData();

const dbname = 'malaria.sqlite'

//create express app
const app = express();

// Add body-parser comme middleware global
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Server port
var PORT = process.env.PORT || 8000

const db = require("./app/models/index");
const Declaration = db.declaration;

db.sequelize.sync();

  function initial(){
    Declaration.create({
        dateCreation : new Date().toISOString(),
        response :{"sex":"F", "2": ">15", "3":"enceinte"},
        position : "Tsimfou, Nkong-Zem, Menoua, Ouest, Cameroun",
    })
  }

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello world');
    res.json({ "message": "Ok" });
})

//endpoint to get all declarations
app.get("/api/declarations", (req, res, next) => {
    var sql = "SELECT * FROM declarations"
    var params = []
    pool.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": results.rows
        })
    });
});

// Endpoint to get declarations created between yesteday (except) and today
app.get("/api/declarations/today", (req, res) => {
    // yesteday Date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Today date
    const today = new Date();

    let query = `SELECT * FROM Declarations 
                 WHERE dateCreation > $1 AND dateCreation <= $2`;

    pool.query(query, [yesterday.toISOString(), today.toISOString()], (err, results) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.json(results.rows);
    });
});


// Endpoint to get declarations for the n last hour
app.get("/api/declarations/hour/:n", (req, res) => {
    // nb of hour
    const n = parseInt(req.params.n);

    // Today date
    const now = new Date();

    const lastHour = new Date();
    lastHour.setHours(lastHour.getHours() - n)

    let query = `SELECT * FROM Declarations 
                 WHERE dateCreation > $1 AND dateCreation <= $2`;

    pool.query(query, [lastHour.toISOString(), now.toISOString()], (err, results) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.json(results.rows);
    });
});


//endpoint get a single declaration by id
app.get("/api/declarations/:id", (req, res, next) => {
    var sql = "SELECT * FROM Declarations WHERE id =$1"
    const id = parseInt(req.params.id);
    pool.query(sql, [id], (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": results.rows
        })
    });
})


// get the location name by the user position 
async function getPosition(coords) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=`);
        const data = await response.json();
        const position = data.display_name;
        return position; // Retourne la position obtenue de la promesse
    } catch (error) {
        console.error('Erreur lors de la requête vers l\'API Nominatim:', error);
        throw error; // Lance une erreur pour propager l'erreur vers l'appelant
    }
}

// insert a new declaration
app.post("/api/declarations", async (req, res) => {
    try {
        var errors = [];
        if (!req.body.position) {
            errors.push("Position is missing");
        }
        if (!req.body.response) {
            errors.push("Response is missing");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        const position = await getPosition(req.body.position.coords); // Attend la résolution de la promesse

        var data = {
            position: position,
            response: JSON.stringify(req.body.response),
            DateCreation: new Date().toISOString()
        };

        var query = 'INSERT INTO declarations (position, response, DateCreation) VALUES ($1,$2,$3)';
        var params = [data.position, data.response, data.DateCreation];

        pool.query(query, params, function (err, results) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(201).json(`Declaration added with ID: ${results.rows[0].id}`);
        });
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

// endpoint to update an existing record
app.patch("/api/declarations/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    var data = [req.body.position, req.body.response, new Date().toISOString(), id];
    let query = `UPDATE Declarations SET 
               position = $1, 
               response = $2, 
               dateCreation = $3
               WHERE id = $4`;

    pool.query(query, data, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.status(200).send(`User modified with ID: ${id}`);
    });
})


// Endpoint to get the number of declarations between yesteday(except) and today
app.get("/api/declarations/todayNb", (req, res) => {
    // yesteday date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Today date
    const today = new Date();

    // SQL request to get the number of declarations between yesteday(except) and today
    let query = `SELECT count(*) FROM Declarations 
                 WHERE dateCreation >= $1 AND dateCreation < $2`;

    db.all(query, [yesterday.toISOString(), today.toISOString()], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.json(rows);
    });
});



//endpoint to get all citizens
app.get("/api/citizens", (req, res, next) => {
    var sql = "SELECT * FROM citizens"
    var params = []
    pool.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": results.rows
        })
    });
});


//endpoint get a single citizen by id
app.get("/api/citizens/:id", (req, res, next) => {
    var sql = "SELECT * FROM citizens WHERE citizen_id =$1"
    const id = parseInt(req.params.id);
    pool.query(sql, [id], (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": results.rows
        })
    });
})


//endpoint to get all administrator
app.get("/api/admin", (req, res, next) => {
    var sql = "SELECT * FROM administrator"
    var params = []
    pool.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": results.rows
        })
    });
});


//endpoint get a single administrator by id
app.get("/api/admin/:id", (req, res, next) => {
    var sql = "SELECT * FROM administrator WHERE admin_id =$1"
    const id = parseInt(req.params.id);
    pool.query(sql, [id], (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": results.rows
        })
    });
})


//endpoint to get all health personnel
app.get("/api/health", (req, res, next) => {
    var sql = "SELECT * FROM health_personnels";
    var params = [];
    pool.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": results.rows
        })
    });
});


//endpoint get a single health personnel by id
app.get("/api/health/:id", (req, res, next) => {
    var sql = "SELECT * FROM health_personnels WHERE health_id =$1"
    const id = parseInt(req.params.id);
    pool.query(sql, [id], (err, results) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": results.rows
        })
    });
})


// Delete a health personnel
app.delete( "/api/health/:id", (request, response, next) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM health_personnels WHERE health_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  });

  // Delete a citizen
app.delete( "/api/citizens/:id", (request, response, next) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM citizens WHERE citizen_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  });

    // Delete an administrator
app.delete( "/api/administrator/:id", (request, response, next) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM citizens WHERE citizen_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  });


// Start server
app.listen(PORT, () => {
    console.log('port is listening on port ', PORT);
});

//close the database
//db.close();

