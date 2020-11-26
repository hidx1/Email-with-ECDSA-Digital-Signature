import React, { Component } from 'react';

class Tab extends React.Component {
    render(){
   
      // Classes to add to the <a> element
      let tabClasses = ["nav-link"];
      // Classes to add to the <i> element (the icon)
      let iconClasses = ["fa",this.props.icon];
  
      // Update the class array if the state is visible
      if (this.props.activeTab) {
        tabClasses.push("active");
     
      }
      
      return (
          <li className="nav-item">
              <a className={tabClasses.join(' ')} href="#">
                <i className={iconClasses.join(' ')}></i>&nbsp;&nbsp;{this.props.name}
              </a>
          </li>
      )
    }
  }

  export default Tab;