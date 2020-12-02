import React, { Component } from 'react';
class LabelItem extends React.Component {
  
    handleClick(){

      this.props.onClick(this.props.id);
    }
    
    render(){ 
      return (
          <li className="list-group-item justify-content-between" style={{cursor:'pointer'}} onClick={this.handleClick.bind(this)}>
            {this.props.label.name}
            <span className="badge badge-default badge-pill">{this.props.label.emailNumber}</span>
          </li>
      )
    }
  }


export default LabelItem;