// const HOST = 'http://epitrack.tk';
const HOST = 'http://localhost:7766';

class Util {
    static request(endpoint, data) {
        return new Promise((resolve, reject) => {
            fetch(HOST + endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : undefined
            })
                .then(resp => resp.json())
                .then(data => resolve(data))
                .catch(reject);
        });
    }

    static fetchPatients() {
        return Util.request('/patients');
    }

    static updatePatientInformation(patientID, information) {
        return Util.request('/updateinfo', { patientID, information });
    }

    static fetchPatientInformation(patientID) {
        return Util.request('/getinfo', { patientID });
    }

    static fetchMessages(patientID) {
        return Util.request('/fetchmsg', { patientID });
    }

    static sendMessage(patientID, msg) {
        return Util.request('/sendmsg', { patientID, me: true, msg });
    }

    static imageUrl(patientID) {
        return HOST + `/image/${patientID}`;
    }

    static waitForMsg(patientID, num) {
        let cancelled = false;

        const prom = new Promise(resolve => {
            const wait = () => {
                Util.request('/waitmsg', { patientID, num }).then(resp => {
                    if (cancelled) return;
                    if (resp.msg) {
                        resolve();
                    } else {
                        wait();
                    }
                });
            };

            wait();
        });

        return {
            prom,
            cancel: () => {
                cancelled = true;
            }
        };
    }
}

export default Util;
