import { FavoriteList } from "./components";

export default (props) => {
  return (
    <div className="d-flex flex-row flex-fill pt-4 p-2">
      <FavoriteList
        favorites={props.favorites}
        removeFavorite={props.removeFavorite}
      />
    </div>
  );
};
