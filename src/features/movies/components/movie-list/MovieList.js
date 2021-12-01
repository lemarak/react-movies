import React, { Component } from "react";
import MovieElement from "./MovieElement/MovieElement";

export default class MovieList extends Component {
  render() {
    const displayMovies = this.props.movies.map((movie, index) => {
      return (
        <MovieElement
          movie={movie}
          key={movie.title + index}
          updateSelectedMovie={() => this.props.updateSelectedMovie(index)}
          isFavorite={this.props.favorites.includes(movie.title)}
          addFavorite={this.props.addFavorite}
          removeFavorite={this.props.removeFavorite}
        />
      );
    });
    return (
      <div className="w-75 d-flex flex-row flex-wrap justify-content-center">
        {displayMovies}
      </div>
    );
  }
}
