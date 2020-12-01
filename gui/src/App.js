import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import NavBar from './component/NavBar';
import MainContainer from './component/MainContainer';
import Login from './component/Login'
import {GET_INBOX,GET_SENT_EMAILS,SIGN_IN} from './static/const'
/**JANGAN LUPA ENABLE CORS DI BROWSER (BISA PAKE CORS EVERYWHERE DI FIREFOX) */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null,
      inbox: null,
      sentEmails : null,
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    /****************PAKE INI KALAU BELUM ADA COOKIE**************************/
    let signInWindow = window.open(SIGN_IN, "_blank", "status=yes");
    let thats = this;
    let user='';
    let inbox ='';
    let sent='';
    let timer = setInterval(function() {
      let that = thats;

      if (signInWindow.closed) {
        clearInterval(timer);
        axios({
          url: GET_INBOX,
          method: "get",
          withCredentials: true,
        })
        .then((response) => {
          if(response.status === 200){
            user = response.data.payload.user_email
            inbox = response.data.payload.emails
              axios({
                url: GET_SENT_EMAILS,
                method: "get",
                withCredentials: true,
              })
              .then((response2) => {
             
                sent = response2.data.payload.emails
                that.setState({
                  signedIn: true,
                  sentEmails:sent,
                  user:user,
                  inbox:inbox 
                });
              });
          }

        });

      }
    }, 2000);

    /***********PAKE INI AJA KALAU UDAH ADA COOKIE*************/
  //   axios({
  //     url: "https://backend-kripto.yoelsusanto.com/api/email?type=inbox",
  //     method: "get",
  //     withCredentials: true,
  //   })
  //   .then((response) => {
  //     this.setState({
  //       signedIn: true,
  //       user: response.data.payload.user_email,
  //       inbox: response.data.payload.emails
  //     });
  //   });
  }

  render() {
    const { signedIn, user, inbox} = this.state;
    

    return (
      <div>
        {signedIn ? (
          <div>
            <NavBar title="Kripto Email Client" user={user} />
            <MainContainer inbox={this.state.inbox} sentEmails ={this.state.sentEmails}/>
          </div>
        ) : (
          <div style={{height: '100vh'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <Login signIn = {this.signIn}></Login>
             
            </div>
          </div>
        )}  
      </div>
    )
  }
}

export default App;
