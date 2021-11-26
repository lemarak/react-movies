import React, { Component } from "react";
import apiMovie from "./conf/axios-conf";

import {
  Header,
  MovieList,
  MovieDetails,
  Loading,
  SearchBar,
} from "./components";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    apiMovie
      .get("/discover/movie")
      .then((response) => response.data.results)
      .then((moviesApi) => {
        const movies = moviesApi.map((movie) => ({
          img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          details: `${movie.release_date} | ${movie.vote_average}/10 | ${movie.vote_count}`,
          description: movie.overview,
        }));
        this.updateMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  updateSelectedMovie = (index) => {
    this.setState({ selectedMovie: index });
  };

  updateMovies(movies) {
    this.setState({
      movies,
      isLoading: false,
    });
  }

  // render
  render() {
    return (
      <div className="App d-flex flex-column">
        <Header />
        <SearchBar updateMovies={this.updateMovies} />
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
