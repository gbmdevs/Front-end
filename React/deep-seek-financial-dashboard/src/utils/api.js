import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


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
  