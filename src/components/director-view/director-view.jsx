import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{movie.Directors.Name}</span>
        </div>
        <div className="director-biography">
          <span className="label">Biography: </span>
          <span className="value">{movie.Directors.Bio}</span>
        </div>
        <div className="director-birth-year">
          <span className="label">Birth Year: </span>
          <span className="value">{movie.Directors.BirthYear}</span>
        </div>
        <div className="director-death-year">
          <span className="label">Death Year: </span>
          <span className="value">{movie.Directors.DeathYear}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Biography: PropTypes.string.isRequired,
      BirthYear: PropTypes.string.isRequired,
      DeathYear: PropTypes.object.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

