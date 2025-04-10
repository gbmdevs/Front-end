import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define a type for the API response (you can customize this based on your API)
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

// Create the Axios instance with typed configuration
const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', // Fallback for dev
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: set a timeout for requests
});

// Request interceptor to add the token
API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 or other errors
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('Unauthorized access - redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic POST request with type safety
export const post = async <T = unknown>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await API.post<ApiResponse<T>>(url, data);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

// Generic GET request with type safety
export const get = async <T = unknown>(url: string): Promise<T> => {
  try {
    const response = await API.get<ApiResponse<T>>(url);
    return response.data.data; // Adjust based on your API structure
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// Optional: Add other HTTP methods (PUT, DELETE, etc.)
export const put = async <T = unknown>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await API.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

export const del = async <T = unknown>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await API.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

// Export the API instance for custom use if needed
export default API;