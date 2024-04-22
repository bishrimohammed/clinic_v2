export const Host_URL =
  import.meta.env.VITE_REACT_DEV === "developement"
    ? `${import.meta.env.VITE_API_BASE_DEVELOPMENT}/`
    : `${import.meta.env.VITE_API_BASE_PRODUCTION}/`;
