import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

class MainView extends React.Component {

constructor(){
  super();
  this.state = {
    movies: [
      { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
      { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
      { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
    ]
  }
}

render() {
  const { movie } = this.state;
  return <div className="movie-card" >{movie.Title}</div>;
}
}

export default MainView;