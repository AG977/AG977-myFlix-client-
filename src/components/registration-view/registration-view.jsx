import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ DateOfBirth, setDateOfBirth ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const history = useHistory();
 
   const validate = () => {
    let isReq = true;

    if(!username){
        setUsernameErr('Username required');
        isReq = false;
    }else if(username.length < 5){
        setUsernameErr('Username must be at least 5 characters long');
        isReq = false;
    }
    if(!password){
        setPasswordErr('Password required');
        isReq = false;
    }else if(password.length < 5){
        setPassword('Password must be at least 5 characters long');
        isReq = false;
    }
    if(!email){
        setEmailErr('Email required');
        isReq = false;
    }else if(email.indexOf('@') === -1){
        setEmail('Email must be valid');
        isReq = false;
    }

    return isReq;
}

  const handleSubmit = (e) => {
    //const navigate = useNavigate();
    e.preventDefault();
    const isReq = validate();
        if(isReq) {
    axios.post('https://myflixchill.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      DateOfBirth: DateOfBirth
    })
    .then(response => {
      const data = response.data;
      history.push('/') 
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }};
  
  return (
    <Container>
      <Row>
        <Col className="registrationcol">
          <CardGroup>
            <Card className="registrationcard">
              <Card.Body>
                <Card.Title>Welcome to the registration page!</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text" 
                      placeholder="Enter a username"
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      required 
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password" 
                      placeholder="Your password must be 8 or more characters"
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      required  
                      minLength="8"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>email:</Form.Label>
                    <Form.Control
                      type="email" 
                      placeholder="Enter your email"
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required
                    /> 
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
          
                  <Form.Group>
                    <Form.Label>DateOfBirth:</Form.Label>
                    <Form.Control
                      type="date" 
                      placeholder="Enter your date of birth"
                      value={DateOfBirth} 
                      onChange={e => setDateOfBirth(e.target.value)}
                      required 
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
          
  );
}

RegistrationView.propTypes = {
  validate: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      DateOfBirth: PropTypes.object.isRequired
    }),
    onRegistration: PropTypes.func,
  };
  


