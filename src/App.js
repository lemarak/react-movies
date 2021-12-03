import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import apiMovie, { apiMovieMap } from "./conf/api.movies";
import apiFirebase from "./conf/api.firebase";
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
      favorites: null,
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
    apiFirebase
      .get("favorites.json")
      .then((response) => {
        let favorites = response.data ? response.data : [];
        this.updateFavorites(favorites);
      })
      .catch();
  }

  updateSelectedMovie = (index) => {
    this.setState({ selectedMovie: index });
  };

  updateMovies = (movies) => {
    this.setState({
      movies,
      isLoading: this.state.favorites ? false : true,
    });
  };

  updateFavorites = (favorites) => {
    this.setState({
      favorites,
      isLoading: this.state.movies ? false : true,
    });
  };

  addFavorite = (title) => {
    const favorites = [...this.state.favorites];
    const film = this.state.movies.find((movie) => movie.title === title);
    favorites.push(film);
    this.setState({ favorites }, () => {
      this.saveFavorites();
    });
  };

  removeFavorite = (title) => {
    const favorites = [...this.state.favorites];
    const index = this.state.favorites.findIndex(
      (movie) => movie.title === title
    );
    favorites.splice(index, 1);
    this.setState({ favorites }, () => {
      this.saveFavorites();
    });
  };

  saveFavorites = () => {
    apiFirebase.put("favorites.json", this.state.favorites);
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
                    addFavorite={this.addFavorite}
                    removeFavorite={this.removeFavorite}
                    favorites={this.state.favorites}
                  />
                );
              }}
            />
            <Route
              path="/favorites"
              render={(props) => {
                return (
                  <Favorites
                    {...props}
                    isLoading={this.isLoading}
                    favorites={this.state.favorites}
                    removeFavorite={this.removeFavorite}
                  />
                );
              }}
            />
            <Redirect to="/movies" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
