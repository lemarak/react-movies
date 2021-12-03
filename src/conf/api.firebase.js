import axios from "axios";

const apiFirebase = axios.create({
  baseURL:
    "https://movies-a212d-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default apiFirebase;
