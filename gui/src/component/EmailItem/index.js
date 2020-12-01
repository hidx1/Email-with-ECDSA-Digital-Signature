import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

class EmailItem extends React.Component {
  
    handleEmailClick() {
      //Call to the parent's method passed through properties.
      this.props.handleEmailClick(this.props.email);
    }
    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
   
      return [date.getFullYear(), mnth, day].join("-");
    }
    
    render(){
      const formatDate = this.convert(this.props.email.date)
      return (
        <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
            <div className="checkbox">
              <input type="checkbox" />
            </div>
  
            {/* &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp; */}
            <span className="name"><b> {this.props.email.sender}</b></span> 
            <span>{this.props.email.subject}</span>
            
            <span className="ml-auto p-2">
              {/* <span className="fa fa-paperclip">&nbsp;&nbsp;</span> */}
              <span className="badge badge-default badge-pill">{formatDate}</span>
            </span>
          </li>
          
      )
    }
  }


export default EmailItem;