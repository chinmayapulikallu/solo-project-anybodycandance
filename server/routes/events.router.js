const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all events 
 */
router.get('/', (req, res) => {
    console.log('in router get');
    const sqlText = `SELECT * FROM  event`;
    pool
        .query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

/**
 * Add an event by admin 
 */
router.post('/', (req, res) => {
    let query = `INSERT INTO event ("event_name", "event_location", "event_date") VALUES ($1, $2,$3);`
    let values = [req.body.event_name, req.body.event_location,req.body.event_date]
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});

module.exports = router;