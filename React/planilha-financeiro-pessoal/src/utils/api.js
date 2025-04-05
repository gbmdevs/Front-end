import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para cada requisição adicionar o token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Caso venha qualer 401 ou error
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error('Unauthorized access');
      localStorage.removeItem('token'); // Clear the token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

//POST Request
export const post = async (url, data) => { 
    try {
      const response = await API.post(url, data); 
      console.log('retorno :', JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
};

// GET Request  
export const get = async (url) => {
  try {
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};