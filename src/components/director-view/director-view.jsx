import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-biography">
          <span className="label">Biography: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth-year">
          <span className="label">Birth Year: </span>
          <span className="value">{director.BirthYear.split("T")[0]}</span>
        </div>
        <div className="director-death-year">
          <span className="label">Death Year: </span>
          <span className="value">{director.DeathYear ? director.DeathYear.split("T")[0] : "Still alive!" }</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    BirthYear: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

