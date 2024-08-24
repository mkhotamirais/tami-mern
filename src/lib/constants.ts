const url = import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD;
const urlMysql =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV_MYSQL : import.meta.env.VITE_URL_PROD_MYSQL;

const versionMongodb = [
  { href: "/", label: "version" },
  { href: "v0-todo", label: "v0 todo" },
  { href: "/v1-mongodb", label: "v1 mongodb" },
  { href: "/v1-1-mongodb", label: "v1-1 mongodb" },
  { href: "/v1-2-mongodb", label: "v1-2 mongodb" },
  { href: "/v2-mongodb", label: "v2 mongodb" },
  { href: "/v3-mongodb", label: "v3 mongodb" },
  { href: "/v4-mongodb", label: "v4 mongodb" },
  { href: "/v5-mongodb", label: "v5 mongodb" },
  { href: "/v1-mysql", label: "v1 mysql" },
  { href: "/v1-mysql", label: "v1 mysql" },
  { href: "/v1-mysql", label: "v1 mysql" },
  { href: "/v1-mysql", label: "v1 mysql" },
];

export { url, urlMysql, versionMongodb };
