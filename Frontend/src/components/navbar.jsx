import React from 'react';
import Logo from '../res/logo.png';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img src={Logo} height={50} />
                </a>
            </nav>
        );
    }
}

export default Navbar;
