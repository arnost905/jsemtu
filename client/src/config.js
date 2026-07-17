const isProduction = window.location.hostname === "jskod.cz";

const API_URL = isProduction
  ? "https://jskod.cz/jsemtu/api"
  : `http://${window.location.hostname}/JsemTu/api`;

export default API_URL;
