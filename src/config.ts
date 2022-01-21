export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://farewell-wecode-api.herokuapp.com'
    : 'http://localhost:8000';
