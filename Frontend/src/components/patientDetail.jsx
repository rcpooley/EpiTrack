import React from 'react';
import Util from '../util';

class PatientDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            information: ''
        };
    }

    updateInformation(information) {
        this.setState({ information });
    }

    renderPatientDetail() {
        const { patient } = this.props;

        return (
            <div className="d-flex">
                <div>
                    <img src={Util.imageUrl(patient.id)} width={100} />
                </div>
                <table id="detailData" className="ml-1">
                    <tr>
                        <td>Name:</td>
                        <td>
                            {patient.firstName} {patient.lastName}
                        </td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>{patient.age}</td>
                    </tr>
                </table>
            </div>
        );
    }

    renderVitals() {
        return (
            <div id="vitals" className="d-flex mt-2">
                <div className="card">
                    <div className="card-header">Patient Temperature</div>
                    <div className="card-body">
                        <span>10000</span>
                    </div>
                </div>
                <span className="p-2" />
                <div className="card">
                    <div className="card-header">Blood Oxygen</div>
                    <div className="card-body">
                        <span>10000</span>
                    </div>
                </div>
            </div>
        );
    }

    renderPatientInformation() {
        return (
            <div className="card h-100">
                <div className="card-header">Patient Information</div>
                <div className="card-body">
                    <textarea
                        className="w-100"
                        value={this.state.information}
                        onChange={e => this.updateInformation(e.target.value)}
                    />
                </div>
            </div>
        );
    }

    renderMessages() {
        return (
            <div className="card h-100">
                <div className="card-header">Messages</div>
                <div className="card-body">Yeet</div>
            </div>
        );
    }

    render() {
        const { patient } = this.props;

        if (!patient) {
            return null;
        }

        return (
            <div id="patientDetail" className="pt-2 h-100 d-flex flex-column">
                <div className="d-flex">
                    <div className="w-50 pr-1">
                        {this.renderPatientDetail()}
                        {this.renderVitals()}
                    </div>
                    <div className="w-50 pl-1">
                        {this.renderPatientInformation()}
                    </div>
                </div>
                <div className="d-flex mt-2 mb-2 flex-grow-1">
                    <div className="w-50 pr-1">Graphs</div>
                    <div className="w-50 pl-1">{this.renderMessages()}</div>
                </div>
            </div>
        );
    }
}

export default PatientDetail;
