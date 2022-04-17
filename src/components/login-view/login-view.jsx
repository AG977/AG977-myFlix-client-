import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;

    if(!username){
        setUsernameErr('Username required');
        isReq = false;
    }else if(username.length < 2){
        setUsernameErr('Username must be at least 2 characters long');
        isReq = false;
    }
    if(!password){
        setPasswordErr('Password required');
        isReq = false;
    }else if(password.length < 6){
        setPassword('Password must be at least 6 characters long');
        isReq = false;
    }

    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
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
}};

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
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                      type="password" 
                      onChange={e => setPassword(e.target.value)} 
                      required
                      placeholder="Password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Link to ="/register">Register now!</Link>
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

