const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for dancers
 */
router.get('/', rejectUnauthenticated, (req, res) => {
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
router.post('/', rejectUnauthenticated, (req, res) => {
    let query = `INSERT INTO dancer
                ("id", "first_name", "last_name", "contact_number", "email_id", "dance_style" ) 
                VALUES ($1, $2, $3, $4, $5, $6);`
    let values = [req.body.user_id, req.body.first_name, req.body.last_name, 
                 req.body.contact_number, req.body.email_id, parseInt(req.body.dance_style)]
    console.log("new dancer calues ::: ", values)
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});


//route to delete a dancer from the database
router.delete('/:id', (req, res) => {
    let values = [req.params.id]
    let dancer_events_sql = `DELETE FROM dancer_events where dancer_id = $1;`
    pool.query(dancer_events_sql, values).then((result) => {
        let dancer_sql = `DELETE FROM "dancer" where id = $1;`
        pool.query(dancer_sql, values).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error', error);
        res.sendStatus(500);
    });
}).catch(error => {
    console.log('error', error);
    res.sendStatus(500);    
});
});

module.exports = router;