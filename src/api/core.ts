import axios from 'axios';

const coreApiUrl = new URL(`http://${process.env.REACT_APP_API_CORE_URL}`);

export const coreApi = axios.create({
  baseURL: coreApiUrl.toString(),
  withCredentials: true,
});
