const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("172.");

const API_URL = isLocal
  ? `http://${window.location.hostname}/JsemTu/api`
  : "https://jskod.cz/jsemtu/api";

export default API_URL;
