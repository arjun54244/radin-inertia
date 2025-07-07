import axios from "axios";

const instance = axios.create({
  baseURL: "/api", 
  withCredentials: true, 
   headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default instance;