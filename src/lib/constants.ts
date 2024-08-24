const url = import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD;
const urlMysql =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV_MYSQL : import.meta.env.VITE_URL_PROD_MYSQL;

export { url, urlMysql };
