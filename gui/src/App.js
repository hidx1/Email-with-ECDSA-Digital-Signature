import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './component/NavBar';
import MainContainer from './component/MainContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null,
    }
  }

  signIn() {
    console.log("SIGN IN");
    let signInWindow = window.open("https://backend-kripto.yoelsusanto.com/api/gauth/authorization_url", "_blank", "status=yes");
    let doc = null;
    let timer = setInterval(function() {
      doc = signInWindow.document;
      if (signInWindow.closed) {
        clearInterval(timer);
        console.log(doc);
        console.log("CLOSED")
      }
    }, 3000);
  }

  render(){
    const { signedIn, user } = this.state;
    return (
      <div>
        {signedIn ? (
          <div>
            <NavBar title="Kripto Email Client" user="test@gmail.com" />
            <MainContainer />
          </div>
        ) : (
          <div style={{height: '100vh'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <button type="button" onClick={this.signIn}>Sign In</button>
            </div>
          </div>
        )}  
      </div>
    )
  }
}

export default App;
