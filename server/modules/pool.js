const pg = require(`pg`);

const Pool = pg.Pool;

const pool = new Pool({
    database: `weekend_to_do_app`,
    host: `localhost`,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
});

pool.on(`connect`, () => {
    console.log(`PostgresSQL connected`);
});

pool.on(`error`, (error) => {
    console.log(`database connection error`, error);
});

module.exports = pool;