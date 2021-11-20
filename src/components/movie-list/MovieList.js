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
        />
      );
    });
    return (
      <div className="w-75 d-flex flex-row flex-wrap align-content-start">
        {displayMovies}
      </div>
    );
  }
}
