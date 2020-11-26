import React, { Component } from 'react';
import EmailLabels from '../EmailLabels';
import EmailList from '../EmailList';
import Compose from '../Compose';
import EmptyBox from '../EmptyBox';

class MainContainer extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        selectedLabel : 1,
        numberOfSentEmail:0,
        emails : [
          {
            id: 0,
            labelId: 1,
            from: 'Yoel pro',
            subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            time: "11:15"
          },
          {
            id: 1,
            labelId: 1,
            from: 'Susanto pro',
            subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            time: "22:08"
          },
          {
            id: 2,
            labelId: 1,
            from: 'Susanto pro 2',
            subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            time: "22:08"
          }
  
        ],
        labels:[{
          id : 1,
          name: 'Inbox',
          emailNumber : 0
        },{
          id : 2,
          name: 'Important',
          emailNumber : 0
        },{
          id : 3,
          name: 'Sent',
          emailNumber : 0
          
        },{
          id : 4,
          name: 'Trash',
          emailNumber : 0
        }]
      }
    }
    componentDidMount(){
      let labels= [...this.state.labels]

      labels[2].emailNumber= this.state.numberOfSentEmail+1
      labels[0].emailNumber = this.state.emails.length
  
      this.setState({ labels });
    }
    handleLabelClick(labelId){

      this.setState({
        selectedLabel: labelId
      });
    }
    
    addSentEmail(){
      let labels= [...this.state.labels]

      labels[2].emailNumber= this.state.numberOfSentEmail+1
  
      this.setState({ labels });
      this.setState({
        numberOfSentEmail: this.state.numberOfSentEmail+1,
        
        });
    }

 
  
  
    render() {

      const filteredEmails = this.state.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);

      let content = null;
      if(filteredEmails.length > 0){
         content = <EmailList emails={filteredEmails} />;
      } else {
         content = <EmptyBox />;
      }
      
      return (
        <div className="container">
          <Compose addSentEmail={this.addSentEmail.bind(this)}/>
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
  