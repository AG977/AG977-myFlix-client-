import React, { useState } from 'react';
import PropTypes from 'prop-types';
import propTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ dateofbirth, setDateOfBirth ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, dateofbirth);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
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
                  </Form.Group>
          
                  <Form.Group>
                    <Form.Label>dateofbirth:</Form.Label>
                    <Form.Control
                      type="date" 
                      placeholder="Enter your date of birth"
                      value={dateofbirth} 
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
  register: propTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dateofbirth: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
};