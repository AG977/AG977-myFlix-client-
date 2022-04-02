import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
      super();

      this.state = {
          Username: null,
          Password: null,
          Email: null,
          Birthday: null,
          FavoriteMovies: [],
      };
  }

  componentDidMount() {
      const accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
  }

  onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
          user: null,
      });
      window.open('/', '_self');
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios
        .get(`https://orishflix.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
  

//allow user to add favorite movies

function FavoriteMovies({ favoriteMovieList}) {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
          </div>
        )
      })
      }
    </div>
  )
}

//updateuser Allow a user to update their user info (username, password, email, date of birth)

function UpdateUser({handleSubmit, handleUpdate}) {
  return (
    <form ClassName='profile-form' onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some information?</h2>
      <label>Username:</label>
      <input
        type='text'
        name='Username'
        defaultValue={user.Username}
        onChange={e => handleUpdate(e)}/>

      <label>Password:</label>
      <input
        type='password'
        name='password'
        defaultValue={user.password}
        onChange={e => handleUpdate(e)}/>

      <label>Email adress:</label>
      <input
        type='email'
        name='email'
        defaultValue={user.email}
        onChange={e => handleUpdate(e)}/>

      <label>Birthday:</label>
      <input
        type='date'
        name='date'
        defaultValue={user.birthday}
        onChange={e => handleUpdate(e)}/>
      <button variant='primary' type='submit'>
        update
      </button>
    </form>
  )
}}}
