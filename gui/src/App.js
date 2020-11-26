import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './component/NavBar';
import MainContainer from './component/MainContainer';






class App extends React.Component {
  render(){
    return (
      <div>
        <NavBar title="Kripto Email Client" user="test@gmail.com" />
        <MainContainer />
      </div>
    )
  }
}







export default App;
