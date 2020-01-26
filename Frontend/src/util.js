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

    static imageUrl(patientID) {
        return HOST + `/image/${patientID}`;
    }
}

export default Util;
