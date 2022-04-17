import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Images from '../../../Images/*.png';
import { Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <Image fluid src={Images[movie.ImagePath]} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
         </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
        <Link to={`/directors/${movie.Director.Name}`}>
        <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
        <Button variant="link">Genre</Button>
        </Link>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.object.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

