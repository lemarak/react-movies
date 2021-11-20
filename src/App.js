import React, { Component } from "react";
import { Header, MovieList, MovieDetails, Loading } from "./components";
import dataMovies from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      isLoading: true,
    };

    setTimeout(() => {
      this.setState({
        movies: dataMovies,
        isLoading: false,
      });
    }, 2500);
  }

  updateSelectedMovie = (index) => {
    this.setState({ selectedMovie: index });
  };
  render() {
    return (
      <div className="App d-flex flex-column">
        <Header />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="d-flex flex-row flex-fill pt-4 p-2">
            <MovieList
              movies={this.state.movies}
              updateSelectedMovie={this.updateSelectedMovie}
            />
            <MovieDetails movie={this.state.movies[this.state.selectedMovie]} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
