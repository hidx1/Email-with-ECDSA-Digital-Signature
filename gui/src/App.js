import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import NavBar from './component/NavBar';
import MainContainer from './component/MainContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null,
      inbox: null,
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    let signInWindow = window.open("https://backend-kripto.yoelsusanto.com/api/gauth/authorization_url", "_blank", "status=yes");
    let timer = setInterval(function() {
      if (signInWindow.closed) {
        clearInterval(timer);
        axios({
          url: "https://backend-kripto.yoelsusanto.com/api/email?type=inbox",
          method: "get",
          withCredentials: true,
        })
        .then(response => {
          this.setState({
            signedIn: true,
            user: response.data.payload.user_email,
            inbox: response.data.payload.emails
          });
        });
      }
    }, 2000);
  }

  render(){
    const { signedIn, user, inbox } = this.state;
    return (
      <div>
        {signedIn ? (
          <div>
            <NavBar title="Kripto Email Client" user={user} />
            <MainContainer inbox={inbox}/>
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
