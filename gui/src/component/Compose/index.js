import React from 'react';
import {
    Toast, ToastBody, ToastHeader,
    Modal,ModalBody,ModalHeader,Form,FormGroup,Input,Label,ModalFooter,Button} from 'reactstrap';

import {EMAIL_URL, SENT_EMAIL} from '../../static/const';
import axios from 'axios';
class Compose extends React.Component {
    state = {
        
        isModalOpen: false,
        
        modalTitle: 'Add New Message',
        encrypt: false,
        ttd:false,
        submitted:false,
        mesg :[]

      }

    //   on click func
      composekey = () => {
          
        this.setState({isModalOpen: true});
      }   
      toggle =()=>{
          this.setState({isModalOpen:false,submitted:false});
      }
      handleEncryptCheckBox=()=>{
          this.setState({encrypt:!this.state.encrypt})
      }
      handleTTDCheckBox=()=>{
          this.setState({ttd:!this.state.ttd})
      }

      //end on click func


      // on submit message
    
      onSubmitForm = async (e) => {
        e.preventDefault();
    
        const formResults = e.target.elements;
        const to= formResults.to.value;
        const subject = formResults.subject.value;
        const message = formResults.message.value;
        const key = this.state.encrypt ? formResults.key.value : null;
    
        // "subject": "contoh subject",
        // "emailText": "contohasdfasdfasfadfadsa",
        // "key": "contohkunci",
        // "destination": "13517014@std.stei.itb.ac.id"
        // const body = {
        //     destination: to,
        //     subject: subject,
        //     emailText: message,
        //     key: key,
        // }
        const isEncrypt = this.state.encrypt?"true":"false";
        const isDigital = this.state.ttd?"true":"false";
        const sentEmail = EMAIL_URL +'?encrypt='+isEncrypt+"&signature="+isDigital;
        let status ='';
        axios({
          method: 'post',
          url: sentEmail,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            destination: to,
            subject: subject,
            emailText: message,
            key: key
          }
        }).then((response2) => {
          status = response2.status;
          // if(response2.status === 200){
          //   status = res
          // }
             console.log(response2)
         
         
        });;
        
        //   const request = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(body)
        //   });
        // console.log(request)
        this.setState({ isModalOpen: false ,submitted:!this.state.submitted});
        if(status == 200){
          this.props.addSentEmail();
        }
       
      }

      // end
    render(){
      return (
      
        <div className="row"> 
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <a href="#" className="btn btn-danger btn-primary btn-block">
              <i className="fa fa-edit" onClick={this.composekey}></i> Compose
            </a>
          </div>
          <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <Form onSubmit={this.onSubmitForm} autoComplete='off'>
            <ModalBody>
                <FormGroup>
                    <Label>To</Label>
                    <Input type='text' name='to'  required />
                </FormGroup>
                <FormGroup>
                    <Label>Subject</Label>
                    <Input type='text' name='subject'  required />
                </FormGroup>
                <FormGroup>
                    <Label>Message</Label>
                    <Input type="textarea" name="message" id="exampleText" />
                </FormGroup>
                
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" 
                    id="checkbox1" 
                    defaultChecked={this.state.encrypt}
                    onChange={this.handleEncryptCheckBox} />
                    Encrypt message
                    </Label>
                </FormGroup>
                {this.state.encrypt?
                    <FormGroup>
                    <Label>Encrypt Key</Label>
                    <Input type='text' name='key'  required />
                    </FormGroup>:null}
             
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" 
                    id="checkbox2" 
                    defaultChecked={this.state.ttd}
                    onChange={this.handleTTDCheckBox} />
                    Tambah tanda tangan digital
                    </Label>
                </FormGroup>
             

                <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
            </ModalBody>
            <ModalFooter>
              <Button color='primary'>Send</Button>{' '}
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Toast isOpen={this.state.submitted}>
        <ToastHeader toggle={this.toggle}>Preview</ToastHeader>
        <ToastBody>
          {this.state.mesg.from}
          </ToastBody>
        </Toast>

        </div>
      )
    } 
  }


  export default Compose;