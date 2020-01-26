import React from 'react';
import Util from '../util';
import Navbar from './navbar';
import Patients from './patients';
import PatientDetail from './patientDetail';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patients: null,
            selectedPatientID: null
        };
    }

    async componentDidMount() {
        const patients = await Util.fetchPatients();
        this.setState({
            patients,
            selectedPatientID: patients.length > 0 ? patients[0].id : null
        });
    }

    getSelectedPatient() {
        const { patients, selectedPatientID } = this.state;
        if (!patients) {
            return null;
        }
        return patients.filter(p => p.id === selectedPatientID)[0];
    }

    render() {
        return (
            <div id="home">
                <Navbar />
                <div id="subnav" className="row">
                    <div className="col-sm-5 col-md-4 col-lg-3 pr-0">
                        <Patients
                            patients={this.state.patients}
                            selected={this.state.selectedPatientID}
                            onSelect={selectedPatientID =>
                                this.setState({ selectedPatientID })
                            }
                        ></Patients>
                    </div>
                    <div className="col-sm col-md col-lg">
                        {this.state.selectedPatientID && (
                            <PatientDetail
                                key={this.state.selectedPatientID}
                                patient={this.getSelectedPatient()}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeComponent;
