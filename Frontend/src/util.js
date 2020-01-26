const HOST = 'http://localhost:7766';

class Util {
    static request(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(HOST + endpoint)
                .then(resp => resp.json())
                .then(data => resolve(data))
                .catch(reject);
        });
    }

    static imageUrl(patientID) {
        return HOST + `/image/${patientID}`;
    }
}

export default Util;
