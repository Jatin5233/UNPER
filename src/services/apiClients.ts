import axios from 'axios';

const API_BASE_URL =  'http://localhost:8000';

export const apiClient = async (endpoint: string, options?: any) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await axios.get(endpoint, config);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};