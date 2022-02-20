import axios from 'axios';

export const coreApiOrigin = new URL(document.URL);

export const coreApi = axios.create({
  baseURL: coreApiOrigin.origin,
  withCredentials: true,
});
