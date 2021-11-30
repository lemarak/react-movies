import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import apiMovie, { apiMovieMap } from "./conf/axios-conf";
import { Header } from "./components";
import Movies from "./features/movies";
import Favorites from "./features/favorites";

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
      <Router>
        <div className="App d-flex flex-column">
          <Header />
          <Switch>
            <Route
              path="/movies"
              render={(props) => {
                return (
                  <Movies
                    {...props}
                    isLoading={this.state.isLoading}
                    updateMovies={this.updateMovies}
                    updateSelectedMovie={this.updateSelectedMovie}
                    selectedMovie={this.state.selectedMovie}
                    movies={this.state.movies}
                  />
                );
              }}
            />
            <Route path="/favorites" component={Favorites} />
            <Redirect to="/movies" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
