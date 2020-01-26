const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./secret.json');

const PATIENTS_DIR = path.join(__dirname, 'patients');
const IMAGES_DIR = path.join(__dirname, 'images');
const DATA_DIR = path.join(__dirname, 'data');

class Database {
    async login(username, password) {
        const token = jwt.sign(
            {
                username
            },
            jwtSecret
        );
        return token;
    }

    async fetchPatients() {
        const ids = fs.readdirSync(PATIENTS_DIR);
        const patients = [];
        ids.forEach(id => {
            const data = JSON.parse(
                fs.readFileSync(path.join(PATIENTS_DIR, id))
            );
            data.id = id.split('.')[0];
            patients.push(data);
        });
        return patients;
    }

    fetchImage(patientID) {
        return path.join(IMAGES_DIR, `${patientID}.png`);
    }

    async fetchInformation(patientID) {
        try {
            return fs.readFileSync(
                path.join(DATA_DIR, `${patientID}.info`),
                'utf-8'
            );
        } catch (e) {
            return '';
        }
    }

    async writeInformation(patientID, information) {
        fs.writeFileSync(path.join(DATA_DIR, `${patientID}.info`), information);
    }

    async fetchMessages(patientID) {
        try {
            return fs
                .readFileSync(path.join(DATA_DIR, `${patientID}.msg`), 'utf-8')
                .split('\n')
                .filter(line => line.length > 0)
                .map(line => {
                    const l = line.replace(/\r/g, '');
                    return {
                        me: line[0] === 'A',
                        msg: line.substring(1)
                    };
                });
        } catch (e) {
            return [];
        }
    }

    async sendMessage(patientID, me, msg) {
        fs.appendFileSync(
            path.join(DATA_DIR, `${patientID}.msg`),
            (me ? 'A' : 'B') + msg + '\n'
        );
    }
}

module.exports = Database;
