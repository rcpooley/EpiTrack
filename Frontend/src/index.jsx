import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './components/home';
import './index.css';

ReactDOM.render(<HomeComponent />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
