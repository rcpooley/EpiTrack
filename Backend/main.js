const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./database');

const PORT = 7766;

const db = new Database();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// map patientID to {}
let nextID = 1;
const messageWaiting = {};
function getMsgWait(patientID) {
    if (!(patientID in messageWaiting)) {
        messageWaiting[patientID] = {};
    }
    return messageWaiting[patientID];
}

app.post('/patients', (req, res) => {
    db.fetchPatients().then(patients => {
        res.json(patients);
    });
});

app.post('/updateinfo', (req, res) => {
    const { patientID, information } = req.body;
    db.writeInformation(patientID, information).then(() => {
        res.json({
            success: true
        });
    });
});

app.post('/getinfo', async (req, res) => {
    const { patientID } = req.body;
    const information = await db.fetchInformation(patientID);
    res.json({ information });
});

app.post('/fetchmsg', async (req, res) => {
    const { patientID } = req.body;
    const messages = await db.fetchMessages(patientID);
    res.json({ messages });
});

app.post('/sendmsg', async (req, res) => {
    const { patientID, me, msg } = req.body;
    await db.sendMessage(patientID, me, msg);
    const wait = getMsgWait(patientID);
    messageWaiting[patientID] = {};
    Object.keys(wait).forEach(oid => {
        const o = wait[oid];
        clearTimeout(o.timeout);
        o.res.json({ msg: true });
    });
    res.send({ success: true });
});

app.post('/waitmsg', async (req, res) => {
    const { num, patientID } = req.body;
    const msgs = await db.fetchMessages(patientID);
    if (msgs.length > num) {
        res.json({ msg: true });
        return;
    }

    const wait = getMsgWait(patientID);
    const id = nextID++;

    const timeout = setTimeout(() => {
        delete wait[id];
        res.json({ timeout: true });
    }, 3 * 1000);
    wait[id] = { timeout, res };
});

app.get('/image/:patientID', (req, res) => {
    res.sendFile(db.fetchImage(req.params.patientID));
});

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
