import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

console.log(import.meta.env.VITE_REACT_DEV === "production");
const Axiosinstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_DEV === "developement"
      ? `${import.meta.env.VITE_API_BASE_DEVELOPMENT}/api/v1`
      : `${import.meta.env.VITE_API_BASE_PRODUCTION}/api/v1`,
});

//console.log(instance);
export default Axiosinstance;
