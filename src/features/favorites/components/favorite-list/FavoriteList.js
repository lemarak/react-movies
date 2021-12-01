import React, { Component } from "react";
import FavoriteElement from "./FavoriteElement/FavoriteElement";

export default class FavoriteList extends Component {
  render() {
    const displayFavorites = this.props.favorites.map((movie, index) => {
      return (
        <FavoriteElement
          favorite={movie}
          key={movie.title + index}
          removeFavorite={this.props.removeFavorite}
        />
      );
    });
    return (
      <div className="w-75 d-flex flex-row flex-wrap justify-content-center">
        {displayFavorites}
      </div>
    );
  }
}
