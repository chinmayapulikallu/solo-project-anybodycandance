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


//route to delete an entry from the events
router.delete('/:id', (req, res) => {
    console.log('id of dancer to be deleted.........>', req.params.id);
    let sqlText = `DELETE FROM dancer_events using "dancer"
                    WHERE "dancer".id = dancer_events.dancer_id
                    and "dancer".id = $1;`;
    let values = [req.params.id]
    pool.query(sqlText, values).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error', error);
        res.sendStatus(500);
    });
});

module.exports = router;