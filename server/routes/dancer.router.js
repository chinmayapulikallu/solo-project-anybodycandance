const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for dancers
 */
router.get('/', (req, res) => {
    console.log('in router get');
    const sqlText = `SELECT * FROM  dancer`;
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
 * POST route template
 */
router.post('/', (req, res) => {
    let query = `INSERT INTO dancer
                ("first_name", "last_name", "contact_number", "email_id", "dance_style" ) 
                VALUES ($1, $2, $3, $4, $5);`
    let values = [req.body.first_name, req.body.last_name, 
                 req.body.contact_number, req.body.email_id, req.body.dance_style]
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});

module.exports = router;