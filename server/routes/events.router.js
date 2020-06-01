const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthorized } = require('../modules/authorization-middleware');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//import sendgrid 
// const sgMail = require('@sendgrid/mail');

/**
 * Get all events
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in router get');
    const sqlText = `SELECT *, event_date at time zone 'cst' as event_date_zoned FROM event`;
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





//use send grid api key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//     to: ['chaysam503@gmail.com', 'chinmayajyothi.chinni@gmail.com'],
//     from: 'chinmayapulikallu@gmail.com',
//     subject: 'Hello from SendGrid',
//     text: 'New Event!!!!!!!',
//     html: '<strong>Hello, A new event is posted. Login and check for more details </strong>',
// };

/**
 * Add an event by admin 
 */
router.post('/', rejectUnauthorized, (req, res) => {
    let query = `INSERT INTO event ("event_name", "event_location", "event_date", "event_image", 
                 "event_dancer_count", "event_description",
                 created_date) VALUES ($1, $2,$3, $4, $5, $6, now());`
    let values = [req.body.event_name, req.body.event_location, req.body.event_date,
                  req.body.event_image, req.body.event_dancer_count, req.body.event_description]
    console.log(values)
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
        // sgMail
        //     .send(msg)
        //     .then(() => { }, error => {
        //         console.error(error);
        //         if (error.response) {
        //             console.error(error.response.body)
        //         }
        //     });
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});


//route to delete an entry from the events
router.delete('/:id', (req, res) => {
    console.log('id of event to be deleted.........>', req.params.id);
    let dancer_events_sql = `DELETE FROM dancer_events where event_id = $1;`
    let values = [req.params.id]
    pool.query(dancer_events_sql, values).then((result) => {
       let events_sql= `DELETE FROM "event" where id = $1;`
        pool.query(events_sql, values).then((result) => {
            console.log("event delete", result);
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


//Update event details where there is a change in the event
router.put('/:id', (req,res) => {
    let id = req.params.id;
    let event_name = req.body.event_name;
    let event_location = req.body.event_location;
    let event_date = req.body.event_date;
    console.log("in put ", id)

    let queryText = `UPDATE event SET event_name=$2, event_location=$3, event_date=$4 WHERE id= $1;`;
    pool.query(queryText, [id, event_name, event_location, event_date])
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
    })
})


/**
 * Get new event posted by admin
 */
router.get('/recent', rejectUnauthenticated, (req, res) => {
    console.log('in router get');
    const sqlText = `SELECT *
                     FROM  event ORDER BY  created_date DESC LIMIT 5`;
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