const ENV = import.meta.env.VITE_ENV || "development";
const envConfig = {
  ENV_MODE: ENV,

  CLIENT_URL:
    ENV === "development"
      ? import.meta.env.VITE_CLIENT_URL_DEV
      : import.meta.env.VITE_CLIENT_URL_PROD,

  API_BASE_URL:
    ENV === "development"
      ? import.meta.env.VITE_API_BASE_URL_DEV
      : import.meta.env.VITE_API_BASE_URL_PROD,
};
export default envConfig;
