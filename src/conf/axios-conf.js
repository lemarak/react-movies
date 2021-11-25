import axios from "axios";

const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/4",
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN_API}`;
  return req;
});

export default apiMovie;
