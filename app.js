const express = require('express');
const { Server } = require('http');
const dbLayer = require('./dbLayer');

const app = express();
const port = 3000;

let con;

app.use(express.json());

app.get('/start', async (req, res) => {
    const result = await dbLayer.getRandomRow(con);
    res.send(result.noun);
});

app.put('/guess', async (req, res) => {
    console.log(req.body);
    const result = await dbLayer.checkResult(con, req.body.word, req.body.guess);
    console.log(result);
    if (result) {
        res.send('well done');
    } else {
        res.send('wrong');
    }
});

app.put('/continue', async (req, res) => {
    const nounId = await dbLayer.getNounIds(con, req.body.previousAnswers);
    const getRow = await dbLayer.getNotX(con, nounId);
    res.send(getRow.noun);
});

async function startServer() {
    con = await dbLayer.connect();
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

startServer().catch(console.error);
