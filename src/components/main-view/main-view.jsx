import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'shrek', Description: 'When a green ogre named Shrek discovers his swamp has been swamped with all sorts of fairytale creatures by the scheming Lord Farquaad, Shrek sets out with a very loud donkey by his side to persuade Farquaad to give Shrek his swamp back. Instead, a deal is made.', ImagePath: 'S1.png'},
        { _id: 2, Title: 'Madagascar', Description: 'A group of animals who have spent all their life in a New York zoo end up in the jungles of Madagascar, and must adjust to living in the wild.', ImagePath: '../../../images/M1.png'},
        { _id: 3, Title: 'The Lion King', Description: 'The Lion King tells the story of Simba (Swahili for lion), a young lion who is to succeed his father, Mufasa, as King of the Pride Lands.', ImagePath: '../../../images/TLK.png'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

 render() {
   const { movies, selectedMovie } = this.state;

   if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

   return (
     <div className="main-view">
        {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
     </div>
   );
 } 
}

export default MainView;



