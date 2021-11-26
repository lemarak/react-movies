import axios from "axios";

const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/4",
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN_API}`;
  return req;
});

export default apiMovie;

export const apiMovieMap = (movie) => ({
  img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  title: movie.title,
  details: `${movie.release_date} | ${movie.vote_average}/10 | ${movie.vote_count}`,
  description: movie.overview,
});
