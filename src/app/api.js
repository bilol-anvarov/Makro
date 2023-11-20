import axios from "axios";
const { VITE_BASE_URL: baseURL } = import.meta.env;

export const axiosClient = () =>
  axios.create({
    baseURL,
    headers: {
      "Accept-Language": localStorage.getItem("i18nextLng"),
      "Content-Type": "application/json",
    },
  });
