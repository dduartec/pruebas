import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'

class groups extends Component {
    render() {
        return (
          <div>
            <Navigation/>
            <p>Ruta grupos</p>
          </div>
        )
    }  
}
export default groups;