import axios from "axios";
import { useStore } from "./store/index";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

client.interceptors.request.use((config) => {
  const store = useStore();
  config.headers.Authorization = `Bearer ${store.user.token}`;

  return config;
});

export default client;
