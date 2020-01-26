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
