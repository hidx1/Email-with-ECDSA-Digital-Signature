import React from 'react';
import Tab from '../Tab';
import EmailItem from '../EmailItem';
import {
  Toast, ToastBody, ToastHeader,
  Modal,ModalBody,ModalHeader,Form,FormGroup,Input,Label,ModalFooter,Button} from 'reactstrap';
class EmailList extends React.Component {
    state = {
          
      isModalOpen: false,
      email:''
    }
    handleEmailClick = (email) => {
      this.setState({isModalOpen:!this.state.isModalOpen,email:email});
      // alert('Clicked'+email.subject);
    };
    toggle =()=>{
      this.setState({isModalOpen:false});
    }
    convert(str) {
      var date = new Date(str),
        time = date.toString().split(' ')[4]
      return time;
    }
    render(){
      const formatTime = this.convert(this.state.email.date);
      return (
        <div>
      
          <ul className="nav nav-tabs">
            <Tab name={this.props.labelId == 1?"Inbox":"Sent"} activeTab={true} icon={this.props.labelId == 1?"fa-inbox":"fa-paper-plane"} />
            
          </ul>
          <div className="list-group">
         
            {this.props.emails.map((email,idx) => (
              
                <EmailItem
                  key={idx}
                  email={email}
                  handleEmailClick={this.handleEmailClick}/>
            ))}
          </div>

          <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.email.subject}</ModalHeader>
    
            <ModalBody>
              <b> {this.state.email.sender}</b> {formatTime}

              <p>{this.state.email.body}</p>
            </ModalBody>  
            <ModalFooter>
              
            </ModalFooter>
          
          
       
        </Modal>
        </div>
      )
    }
  }

export default EmailList;