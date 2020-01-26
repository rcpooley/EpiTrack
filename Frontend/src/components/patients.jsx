import React from 'react';

class Patients extends React.Component {
    render() {
        const { patients, selected, onSelect } = this.props;
        return (
            <div id="patients">
                <ul className="list-group">
                    <li className="list-group-item patient-header">Patients</li>
                    {patients &&
                        patients.map(p => (
                            <li
                                key={p.id}
                                className={`list-group-item${
                                    selected === p.id ? ' active' : ''
                                }`}
                                onClick={() => onSelect(p.id)}
                            >
                                {p.firstName} {p.lastName}
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default Patients;
