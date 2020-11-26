import React from 'react';
import Tab from '../Tab';
import EmailItem from '../EmailItem';
class EmailList extends React.Component {
  
    handleEmailClick = (id) => {
      alert('Clicked'+id);
    };
  
    render(){
      return (
        <div>
      
          <ul className="nav nav-tabs">
            <Tab name="Inbox" activeTab={true} icon="fa-inbox" />
            
          </ul>
          <div className="list-group">
         
            {this.props.emails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  handleEmailClick={this.handleEmailClick}/>
            ))}
          </div>
        </div>
      )
    }
  }

export default EmailList;