import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './components/home';

ReactDOM.render(<HomeComponent />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
