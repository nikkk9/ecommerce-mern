import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const clientReq = axios.create({
  baseURL: BASE_URL,
});

export const authReq = axios.create({
  baseURL: BASE_URL,
  // header: { token: `Bearer ${TOKEN}` },
});
