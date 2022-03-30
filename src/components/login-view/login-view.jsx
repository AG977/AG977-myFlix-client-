import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixchill.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
};

  return (
    <Container>
      <Row>
        <Col className="login-padding">
          <CardGroup>
            <Card className="login">
              <Card.Body>
                <Card.Title id="title">Login page!</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text" 
                      onChange={e => setUsername(e.target.value)}
                      required 
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                      type="password" 
                      onChange={e => setPassword(e.target.value)} 
                      required
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={handleSubmit}>
                    Submit
                  </Button>
                  <a href="../registration-view/registration-view" id="link" >Register now!</a>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};






