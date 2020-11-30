import React ,{Component}from "react";
import {Button} from 'reactstrap';

import googleLogo from '../../img/google-logo.png';



class SocialLogin extends Component {
  
  render() {
      return (
          <div className="social-login">
            <Button onClick={this.props.signIn}><img src={googleLogo} width="20px" height="20px" alt="Google" /> 
                  &nbsp; Sign In</Button>
          
          </div>
      );
  }
}
export default class Login extends Component {
 
   

  render() {
    return (
      <div className="col-md-12">
        
          
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <SocialLogin signIn={this.props.signIn}/>
          </div>
        </div>
     
    );
  }

}