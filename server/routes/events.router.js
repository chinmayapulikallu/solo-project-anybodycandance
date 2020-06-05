const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthorized } = require('../modules/authorization-middleware');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//import sendgrid 
const sgMail = require('@sendgrid/mail');

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
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: ['chaysam503@gmail.com', 'sushil.testuser@gmail.com'],
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Hello from SendGrid',
    text: 'New Event!!!!!!!',
    html: '<strong>Hello, A new event is posted. Login and check for more details <a href="http://localhost:3000/#/home">Any Body Can Dance</a>  </strong>'
};

// const hasEnvVariables = 
//     process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL;
// if (req.user && req.user.email && hasEnvVariables) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//         to: req.user.email,
//         from: process.env.SENDGRID_FROM_EMAIL,
//         subject: "Boredgamr Event",
//         text: "and easy to do anywhere, even with Node.js",
//         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//     };


/**
 * Add an event by admin 
 */
router.post('/', rejectUnauthorized, (req, res) => {
    console.log()
    let query = `INSERT INTO event ("event_name", "event_location", "event_date", "event_image", 
                 "event_dancer_count", "event_description", "street", "city", "state", "zip",
                 created_date) VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, now());`
    let values = [req.body.event_name, req.body.event_location, req.body.event_date,
                  req.body.event_image, req.body.event_dancer_count, req.body.event_description,
                   req.body.street, req.body.city, req.body.state, req.body.zip]
    console.log(values)
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
        sgMail
            .send(msg)
            .then(() => { }, error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body)
                }
            });
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});


//route to delete an entry from the events
router.delete('/:id', rejectUnauthorized,  (req, res) => {
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
router.put('/:id', rejectUnauthorized, (req,res) => {
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
    console.log('in router get', req.user.id);
    // const sqlText = `SELECT *
    //                  FROM  event ORDER BY  created_date DESC LIMIT 5`;
    const sqlText = `SELECT "event".*, count(dancer_events.dancer_id) as current_dancer_count FROM "event" 
                        LEFT outer JOIN "dancer_events" ON "event".id = "dancer_events".event_id 
                        group by dancer_events.event_id, "event".id 
                        having "event".id not in 
                            (select distinct(event_id) from dancer_events where dancer_id=$1) 
                        ORDER BY created_date DESC;`;
    let values = [req.user.id]
    pool
        .query(sqlText, values)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});



//Join event
router.post('/join', rejectUnauthenticated, (req, res) => {
    let query = `INSERT INTO dancer_events ("dancer_id", "event_id") VALUES ($1, $2);`;
    
    let values = [req.body.user_id, req.body.event_id ]
    console.log(values)
    pool.query(query, values).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});


//get event list of one user
router.get('/myevent', rejectUnauthenticated, (req, res) => {
    console.log('in router get event of one user');
    const sqlText = `SELECT "event".* FROM
                     "event" JOIN dancer_events ON dancer_events.event_id = "event".id 
                     WHERE dancer_events.dancer_id=$1;`;
    let values = [req.user.id]
    pool
        .query(sqlText, values)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;