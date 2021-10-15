const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool.js`);


console.log(`IN list.router.js`);


// GET REQUEST
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

// POST REQUEST
router.post(`/`, (req, res) => {
    console.log(`in /list router put request`);
    let newTask = req.body;


    let queryText = `
        INSERT INTO "toDoList" ("task")
        VALUES ($1);
    `;

    let values = [newTask.task];

    pool.query(queryText, values)
        .then((result) => {
            console.log(`Added new task to db!`);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error! Unable to add new task to db.`);
            res.sendStatus(500);
        });
});

router.delete(`/:id`, (req, res) => {
    let id = req.params.id;
    console.log(`ID to delete: `, id);

    let queryText = `
        DELETE FROM "toDoList"
        WHERE "id" = $1;
    `;

    let values = [id];

    pool.query(queryText, values)
        .then((result) => {
            console.log(`ID #`, id, ` deleted successfully from db!`);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR! Unable to delete $`, id, ` from db.`);
            res.sendStatus(500);
        });
    
});





module.exports = router;