import React from 'react';
import {
    Modal,ModalBody,ModalHeader,Form,FormGroup,Input,Label,ModalFooter,Button} from 'reactstrap';

import {EMAIL_URL} from '../../static/const';
import axios from 'axios';
class Compose extends React.Component {
    state = {
        
        isModalOpen: false,
        
        modalTitle: 'Add New Message',
        encrypt: false,
        ttd:false,
        submitted:false,
        mesg :[],
        isSuccess:false

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
        const key = this.state.encrypt || this.state.ttd? formResults.key.value : null;

        const isEncrypt = this.state.encrypt?"true":"false";
        const isDigital = this.state.ttd?"true":"false";
        const sentEmail = EMAIL_URL +'?encrypt='+isEncrypt+"&signature="+isDigital;

        let passed = false;
     
        if (!key && !this.state.encrypt && !this.state.ttd){
          passed = true
          console.log('here')
        } else {
          if(key.length == 8){
            passed = true
          }
        }
        if(passed){
    

          
      
          axios({
            method: 'post',
            url: sentEmail,
            withCredentials: true,
            data: {
              destination: to,
              subject: subject,
              emailText: message,
              key: key
            }
          }).then((response) => {
          
            if(response.status == 200){
        
              this.props.getInbox();
              this.props.getSentEmail();
              this.setState({ isModalOpen: false ,submitted:!this.state.submitted,isSuccess:true});
            
            }        
          
          });;
        
        
      } 
      }

      // end
    render(){
      return (
      
        <div className="row"> 
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <button onClick={this.composekey} style={{cursor:'pointer'}} className="btn btn-danger btn-primary btn-block">
              <i className="fa fa-edit" onClick={this.composekey}></i> Compose
            </button>
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
                    <Input type='text' name='subject' required/>
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
                    &nbsp;Encrypt message
                    </Label>
                </FormGroup>
               
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" 
                    id="checkbox2" 
                    defaultChecked={this.state.ttd}
                    onChange={this.handleTTDCheckBox} />
                    &nbsp;Tambah tanda tangan digital
                    </Label>
                </FormGroup>
                {this.state.encrypt || this.state.ttd?
                    <FormGroup>
                    <Label>Key</Label>
                    <Input type='text' name='key'  required />
                    </FormGroup>:null}
                    {!this.state.isSuccess?<div className="text-danger">Panjang kunci harus 8 </div>:null}
             
             

                {/* <span className="fa fa-paperclip">&nbsp;&nbsp;</span> */}
            </ModalBody>
            <ModalFooter>
              <Button color='primary'>Send</Button>{' '}
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>


        </div>
      )
    } 
  }


  export default Compose;