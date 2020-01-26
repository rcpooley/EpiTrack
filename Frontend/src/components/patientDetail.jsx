import React from 'react';
import Util from '../util';

class PatientDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            information: '',
            updateTimeout: null
        };
    }

    componentDidMount() {
        Util.fetchPatientInformation(this.props.patient.id).then(
            ({ information }) => {
                this.setState({ information });
            }
        );
    }

    componentWillUnmount() {
        const { updateTimeout, information } = this.state;
        if (updateTimeout !== null) {
            clearTimeout(updateTimeout);
            Util.updatePatientInformation(
                this.props.patient.id,
                information
            ).catch(console.error);
        }
    }

    updateInformation(information) {
        this.setState(state => {
            let updateTimeout = state.updateTimeout;
            if (!updateTimeout) {
                updateTimeout = setTimeout(() => this.updateBackend(), 1000);
            }
            return {
                information,
                updateTimeout
            };
        });
    }

    updateBackend() {
        this.setState(state => {
            Util.updatePatientInformation(
                this.props.patient.id,
                state.information
            ).catch(console.error);
            return { updateTimeout: null };
        });
    }

    renderPatientDetail() {
        const { patient } = this.props;

        return (
            <div className="d-flex">
                <div>
                    <img src={Util.imageUrl(patient.id)} width={100} />
                </div>
                <table id="detailData" className="ml-1">
                    <tbody>
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
                    </tbody>
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
                        rows={5}
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
                <div className="card-footer">
                    <form className="m-0">
                        <input type="text" placeholder="Message" />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        );
    }

    render() {
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
