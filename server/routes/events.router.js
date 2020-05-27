const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET request to get all events from database
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


module.exports = router;