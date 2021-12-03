import { FavoriteList } from "./components";
import Loading from "../../components/utils/Loading";

export default (props) => {
  return (
    <>
      {props.isLoading ? (
        <Loading />
      ) : (
        <div className="d-flex flex-row flex-fill pt-4 p-2">
          <FavoriteList
            favorites={props.favorites}
            removeFavorite={props.removeFavorite}
          />
        </div>
      )}
    </>
  );
};
