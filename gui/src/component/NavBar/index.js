import React, { Component } from 'react';

class NavBar extends React.Component {
    
    render() {
   
      return (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
   
          <a className="navbar-brand" href="#">{this.props.title}</a>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ml-auto">
            
          
            
            <li className="nav-item active">
            <a className="nav-link" href="#">{this.props.user} <span className="sr-only">(current)</span><i className="fa fa-angle-down" aria-hidden="true"></i></a>
            </li>
          </ul>
          </div>
        </nav>
      ) 
    }
  }

  export default NavBar;