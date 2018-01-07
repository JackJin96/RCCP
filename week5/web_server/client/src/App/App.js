import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import './App.css';
import logo from './logo.png';
import NewsPanel from './NewsPanel/NewPanel';

class App extends React.Component{
    render() {
        return(
            <div>
                <img className='logo' src={logo} alt='logo'/>
                <div className='container'>
                    <NewsPanel />
                </div>
            </div>
        );
    }
}

export default App;
/* adding 'default' means there is no need to use {} when import app in other files */