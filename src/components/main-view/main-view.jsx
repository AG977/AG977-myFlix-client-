import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { setMovies } from '../../actions/actions';

import { Col, Row, Container } from 'react-bootstrap';
import './main-view.scss';


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
 
  getMovies(token) {
    axios.get('https://myflixchill.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
        user: null
    });
}

    //allow user to add favorite movies

    addFavoriteMovies = (e, movie) => {
      const username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      console.log(username, token)

      axios
          .post(
              `https://myflixchill.herokuapp.com/users/${username}/movies/${movie._id}`, {},
              {
                  headers: { Authorization: `Bearer ${token}` },
              }
          )
          .then((response) => {
              console.log(response);
              alert("Movie added!");
          })
          .catch(function (error) {
              console.log(error);
          });
  };

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    return (
      <Router>
        <NavbarView user={user}/>
        <Container>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return  <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies}/>;
            //return movies.map(m => (
             // <Col xs ={12} sm={6} md={4} lg={3} flex-fill="true" align-items-stretch="true" key={m._id}>
                //<MovieCard movie={m} addFavoriteMovies = {this.addFavoriteMovies} />
             // </Col>
            //))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return  <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col xs ={12} sm={8} md={8} lg={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

    
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/profile" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <ProfileView movies={movies} onBackClick={()=> {}}/>
            </Col>
          }} />

          <Route path="{user}" render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <Col xs ={12} sm={8} md={8} lg={8}>
              <ProfileView movies={movies} user={user} onBackClick={()=> {}}/>
            </Col>
          }} />

        </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);

//xport default MainView;

