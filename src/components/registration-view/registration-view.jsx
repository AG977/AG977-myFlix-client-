import React, { useState } from 'react';
import PropTypes from 'prop-types';
import propTypes from 'prop-types';

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
  <form>
    <label>
      Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}  />
    </label>
    <label>
      email:
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> 
    </label>
    <label>
      dateofbirth:
      <input type="date" value={dateofbirth} onChange={e => setDateOfBirth(e.target.value)} />
    </label>
    <button type="submit" onClick={handleSubmit}>Register</button>
  </form>
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