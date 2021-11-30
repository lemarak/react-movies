import React, { Component } from "react";
import apiMovie, { apiMovieMap } from "./conf/axios-conf";

import { Header } from "./components";
import Movies from "./features/movies";

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
        const movies = moviesApi.map(apiMovieMap);
        this.updateMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  updateSelectedMovie = (index) => {
    this.setState({ selectedMovie: index });
  };

  updateMovies = (movies) => {
    this.setState({
      movies,
      isLoading: false,
    });
  };

  // render
  render() {
    return (
      <div className="App d-flex flex-column">
        <Header />
        <Movies
          isLoading={this.state.isLoading}
          updateMovies={this.updateMovies}
          updateSelectedMovie={this.updateSelectedMovie}
          selectedMovie={this.state.selectedMovie}
          movies={this.state.movies}
        />
      </div>
    );
  }
}

export default App;
