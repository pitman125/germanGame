const mysql = require('mysql');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'supersecret123',
    port: 3306,
    database: 'german_game'
});

async function connect() {
    con.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
    });
}

async function runQuery() {
    con.query('SELECT * FROM noun', (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });
}

async function getRandomRow() {
    con.query('SELECT * FROM noun ORDER BY RAND() LIMIT 1', (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });
}

async function getNotX(x) {
    con.query(`SELECT * FROM noun WHERE id NOT IN (${x}) ORDER BY RAND() LIMIT 1`, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });
}

async function checkResult(word, guess) {
    //
}

async function main() {
    await connect();
    await runQuery();
    await getRandomRow();
    await getNotX(1);
    await sleep(1000);
    con.destroy();
}
main().catch(console.error);

// con.destroy();
