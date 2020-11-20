import React from 'react';

import {
  Button,
  Form
} from 'react-bootstrap';

import {
  keccak,
} from './DigitalSignature';

export default class Page extends React.PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    let message = event.target.formMessage.value;
    let result = keccak(message)
    console.log(result);
  }
  
  render() {
      return (
        <React.Fragment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formMessage">
                  <Form.Control
                    as="textarea"
                    rows={12}
                    className="ml-1 mr-1 mt-1 mb-1"
                  />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="ml-1 mr-1 mt-1 mb-1"
              >
                Submit
              </Button>
            </Form>
        </React.Fragment>
      );
  }
}