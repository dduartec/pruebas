import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class App extends Component {


  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    const responseFacebook = (response) => {
      console.log(response);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <GoogleLogin
          clientId="373142330185-sv6n2fga4rjtqbjre1cr8hlcj7md8u8h.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <FacebookLogin
          appId="337250857041345"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
      </div>

    );
  }
}

export default App;
