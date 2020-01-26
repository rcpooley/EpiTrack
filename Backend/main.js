const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const Database = require('./database');

const PORT = 7766;

const db = new Database();

const app = express();
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await db.login(username, password);
        res.json({ success: true, token });
    } catch (e) {
        res.json({ success: false });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
});
