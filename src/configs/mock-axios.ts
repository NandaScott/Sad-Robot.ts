import axios from 'axios';

const blackhole = axios.create({
  baseURL: '192.0.2.0', // black hole address (https://datatracker.ietf.org/doc/html/rfc5737 for more info.)
});

blackhole.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {} // We don't want the error to be logged.
);

export default blackhole;
