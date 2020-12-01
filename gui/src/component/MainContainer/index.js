import React, { Component } from 'react';
import EmailLabels from '../EmailLabels';
import EmailList from '../EmailList';
import Compose from '../Compose';
import EmptyBox from '../EmptyBox';
import { GET_SENT_EMAILS, SENT_EMAIL,GET_INBOX } from '../../static/const';
import axios from 'axios';
class MainContainer extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        selectedLabel : 1,
        numberOfSentEmail:0,
        filteredEmails:[],
        emails : [],
        sentEmails:[],
        labels:[{
          id : 1,
          name: 'Inbox',
          emailNumber : 0
        },{
          id : 2,
          name: 'Sent',
          emailNumber : 0
          
        }]
      }
    }

    getInbox(){
  
      let inbox ='';
      
      axios({
        url: GET_INBOX,
        method: "get",
        withCredentials: true,
      })
      .then((response) => {
             
    
        inbox = response.data.payload.emails
        this.setState({
        
       
         
          emails:inbox 
        });
      });
    }

    getSentEmail(){
      let sent='';
  
      axios({
        url: GET_SENT_EMAILS,
        method: "get",
        withCredentials: true,
      })
      .then((response) => {
             
        sent = response.data.payload.emails
        this.setState({
    
          sentEmails:sent,
       
        });
      });
    }
    componentDidMount(){
  
      const inbox = this.props.inbox;
      const sentEmails = this.props.sentEmails;
   

      
      let labels= [...this.state.labels]

      // labels[2].emailNumber= this.state.numberOfSentEmail+1
      labels[0].emailNumber = inbox.length == 0 ?0:inbox.length;
      labels[1].emailNumber = sentEmails.length == 0 ? 0 : sentEmails.length;
      this.setState({ labels });
      this.getSentEmail();
      this.getInbox();
      this.setState({
        emails: inbox,
        sentEmails:sentEmails
       
      });
    }

    
    handleLabelClick(labelId){
    

      this.setState({
        selectedLabel: labelId,
       
      });
    }
    
    addSentEmail(){
      let labels= [...this.state.labels]

      labels[1].emailNumber= this.state.numberOfSentEmail+1
  
      this.setState({ labels });
      this.setState({
        numberOfSentEmail: this.state.numberOfSentEmail+1,
        
        });
    }

 
  
  
    render() {

      const filteredEmails =  this.state.selectedLabel == 1 ? this.state.emails : this.state.sentEmails;
      // const filteredEmails = this.state.emails
      let content = null;
      if(filteredEmails.length > 0){
         content = <EmailList emails={filteredEmails} labelId = {this.state.selectedLabel}/>;
      } else {
         content = <EmptyBox />;
      }
      
      return (
        <div className="container">
          <Compose addSentEmail={this.addSentEmail.bind(this)} getInbox={this.getInbox.bind(this)} getSentEmail={this.getSentEmail.bind(this)}/>
          <hr />

          <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
              <EmailLabels onLabelClick={this.handleLabelClick.bind(this)} labels ={this.state.labels} />
            </div> 
            <div className="col-12 col-sm-12 col-md-9 col-lg-10">
              {content}        
            </div>
          </div>
        </div>
      )
    }
  }


  export default MainContainer;
  