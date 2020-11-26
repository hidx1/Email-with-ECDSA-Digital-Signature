import React from 'react';
class EmailItem extends React.Component {
  
    handleEmailClick() {
      //Call to the parent's method passed through properties.
      this.props.handleEmailClick(this.props.email.id);
    }
    
    render(){
      return (
        <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
            <div className="checkbox">
              <input type="checkbox" />
            </div>
  
            &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
            <span className="name">{this.props.email.from}</span> 
            <span>{this.props.email.subject}</span>
            
            <span className="ml-auto p-2">
              <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
              <span className="badge badge-default badge-pill">{this.props.email.time}</span>
            </span>
          </li>
          
      )
    }
  }


export default EmailItem;