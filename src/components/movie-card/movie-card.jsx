import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import Images from '../../../Images/*.png';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, addFavoriteMovies } = this.props;

    return (
      <Card>
       <Card.Img variant="top" src={Images[movie.ImagePath]} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
            <Button size="sm" variant="success" value={movie._id} onClick={(e) => addFavoriteMovies(e, movie)}>Add to Favorites</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};

