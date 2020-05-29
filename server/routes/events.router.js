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
    const sqlText = `SELECT *, created_date at time zone 'utc' at time zone 'cdt' as custom_time_zoned FROM  event`;
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
    let query = `INSERT INTO event ("event_name", "event_location", "event_date", created_date) VALUES ($1, $2,$3, now());`
    let values = [req.body.event_name, req.body.event_location, req.body.event_date]
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
    let sqlText = `DELETE FROM dancer_events using "event"
                    WHERE "event".id = dancer_events.event_id
                    and "event".id = $1;`;
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