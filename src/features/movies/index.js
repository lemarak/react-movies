import { MovieList, MovieDetails, SearchBar } from "./components";
import Loading from "../../components/utils/Loading";

export default (props) => {
  return (
    <>
      <SearchBar updateMovies={props.updateMovies} />
      {props.isLoading ? (
        <Loading />
      ) : (
        <div className="d-flex flex-row flex-fill pt-4 p-2">
          <MovieList
            movies={props.movies}
            updateSelectedMovie={props.updateSelectedMovie}
          />
          <MovieDetails movie={props.movies[props.selectedMovie]} />
        </div>
      )}
    </>
  );
};
