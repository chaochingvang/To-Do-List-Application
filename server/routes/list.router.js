const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);


console.log(`IN list.router.js`);

router.get(`/`, (req, res) => {
    console.log(`in /list router get request`);

    let queryText = `
        SELECT * FROM "toDoList";
    `;

    pool.query(queryText)
        .then((result) => {
            console.log(`sending list from db success!`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error! Unable to send list from db.`);
            res.sendStatus(500);
        });
});


module.exports = router;