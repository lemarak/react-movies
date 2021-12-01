import React, { Component } from "react";
import Style from "./FavoriteElement.module.scss";

export default class FavoriteElement extends Component {
  render() {
    return (
      <div className={"d-flex flex-row bg-light " + Style.container}>
        <img alt="film" width="185" src={this.props.favorite.img} />
        <div className="flex-fill d-flex flex-column p-3">
          <h5>{this.props.favorite.title}</h5>
          <hr className="w-100" />
          <p className="flex-fill">{this.props.favorite.details}</p>
          <div className="d-flex flex-row justify-content-end">
            <button
              onClick={() => {
                this.props.removeFavorite(this.props.favorite.title);
              }}
              className="btn btn-small btn-danger"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}
