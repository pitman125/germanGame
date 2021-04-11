const mysql = require('mysql2/promise');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function questionMarkMaker(x) {
    return '?'.repeat(x.length).split('').join(',');
}

async function connect() {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'supersecret123',
        port: 3306,
        database: 'german_game'
    });
    return con;
}

async function runQuery(con) {
    const [results] = await con.query('SELECT * FROM noun');
    console.log(results[0]);
    return results;
}

async function getRandomRow(con) {
    const [[result]] = await con.query('SELECT * FROM noun ORDER BY RAND() LIMIT 1');
    console.log(result);
    return result;
}

async function getNotX(con, x) {
    const [[results]] = await con.query(`SELECT * FROM noun WHERE id NOT IN (${questionMarkMaker(x)}) ORDER BY RAND() LIMIT 1`, x);
    return results;
}

async function getNounIds(con, x) {
    const [results] = await con.query(`SELECT id FROM noun WHERE noun IN (${questionMarkMaker(x)})`, x);
    return results.map(result => result.id);
}

async function checkResult(con, word, guess) {
    let result;
    console.log(`values: ${word}, ${guess}`);
    try {
        [[result]] = await con.query('SELECT gender.value FROM noun INNER JOIN gender ON gender.id=noun.gender_id WHERE noun=?', (word))
    } catch (error) {
        throw new Error("Word doesn't exist in the DB");
    }
    if (guess === result.value) {
        return true;
    } else {
        return false;
    }
}

async function getGenderReason(con, word) {
    let result;
    try {
        [[result]] = await con.query('SELECT gender_reason.reason FROM gender_reason inner join noun on gender_reason.id=noun.gender_reason_id where noun.noun=?', (word))
    } catch (error) {
        throw new Error("Word doesn't exist in the DB");
    }
    return result.reason;
}

async function closeConnection(con) {
    await con.end();
    return true;
}
module.exports = {
    connect,
    runQuery,
    getRandomRow,
    getNotX,
    checkResult,
    closeConnection,
    getNounIds,
    getGenderReason
};

async function main() {
    const con = await connect();
    await runQuery(con);
    await getRandomRow(con);
    // await getNotX(con, 1);
    // await sleep(1000);
    await con.end();
}

// main().catch(console.error);
