import React from 'react';
import Tab from '../Tab';
import EmailItem from '../EmailItem';

import {
  Badge,
  Modal,ModalBody,ModalHeader,Form,FormGroup,Input,Label,ModalFooter,Button} from 'reactstrap';
import { EMAIL_URL } from '../../static/const';
import axios from 'axios';


class EmailList extends React.Component {
    state = {
          
      isModalOpen: false,
      email:'',
      decrypt: false,
      verify:false,
      isSuccess:false,
      isValid :false,
      message :""
    }
    handleEmailClick = (email) => {
      this.setState({isModalOpen:!this.state.isModalOpen,email:email,isSuccess:false,isValid:false,message:'',decrypt:false,verify:false});
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
    handleDecryptCheckBox=()=>{
      this.setState({decrypt:!this.state.decrypt})
    }
    handleVerifyCheckBox=()=>{
        this.setState({verify:!this.state.verify})
    }

    getProcessMessage =async (e) => {
      e.preventDefault();
    
      const formResults = e.target.elements;
     
      const isDecrypt = this.state.decrypt?"true":"false";
      const isVerify = this.state.verify?"true":"false";
      let url =EMAIL_URL+'verification?decrypt='+isDecrypt+'&verify_signature='+isVerify;
      let body = this.state.email.body;
      const key = this.state.decrypt || this.state.verify? formResults.key.value : null;
      let passed = false;
      if (!key && !this.state.encrypt && !this.state.ttd){
        passed = true
    
      } else {
        if(key.length == 8){
          passed = true
        }
      }
      if(passed){
      axios({
        method: 'post',
        url: url,
        withCredentials: true,
        data: {
          body:body,
          key: key
        }
      })
      .then((response) => {
      
      if(response.status == 200){
        this.setState({
    
          isValid:response.data.payload.signature_validity,
          message :response.data.payload.decrypted_body,
          isSuccess:true
       
        });
      }
      });
    }
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

          <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggle} backdrop={true} size="lg" style={{maxWidth: '1600px', width: '85%', margin: '10px auto'}}>
          <ModalHeader toggle={this.toggle}>{this.state.email.subject}</ModalHeader>
    
            <ModalBody style={{textAlign: 'left'}} >
              <b> {this.state.email.sender}</b> {formatTime}
              <b>  </b>{this.state.isSuccess?<Badge color={this.state.isValid?"primary":"warning"}>{this.state.isValid?"Verify":"Tidak Valid"}</Badge>:null}
              <p style={{wordBreak:"break-all"}}>{this.state.isSuccess && this.state.decrypt?this.state.message:this.state.email.body}</p>
            </ModalBody>  
            <ModalFooter>
            <Form onSubmit={this.getProcessMessage} autoComplete='off'>
            <FormGroup check>
                    <Label check>
                    <Input type="checkbox" 
                    id="checkbox1" 
                    defaultChecked={this.state.decrypt}
                    onChange={this.handleDecryptCheckBox} />
                    Decrypt message
                    </Label>
                </FormGroup>
               
             
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" 
                    id="checkbox2" 
                    defaultChecked={this.state.verify}
                    onChange={this.handleVerifyCheckBox} />
                    Verifikasi
                    </Label>
                    
                </FormGroup>
                {this.state.decrypt || this.state.verify?

                    <FormGroup>
                    <Label>Key</Label>
                    <Input type='text' name='key'  required />
                    {!this.state.isSuccess?<div className="text-danger">Panjang kunci harus 8 </div>:null}
                    </FormGroup>:null}
                  
                  <Button color='primary'>Check</Button>{' '}
                  </Form>
            </ModalFooter>
          
          
       
        </Modal>
        </div>
      )
    }
  }

export default EmailList;