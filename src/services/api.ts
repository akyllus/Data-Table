import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export const apiService = {
  // Generic GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await api.get<ApiResponse<T>>(endpoint, { params });
    return response.data;
  },

  // Generic POST request
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await api.post<ApiResponse<T>>(endpoint, data);
    return response.data;
  },

  // Generic PUT request
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await api.put<ApiResponse<T>>(endpoint, data);
    return response.data;
  },

  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await api.delete<ApiResponse<T>>(endpoint);
    return response.data;
  },

  // Error handler middleware
  setErrorHandler(handler: (error: any) => void) {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        handler(error);
        return Promise.reject(error);
      }
    );
  },
};

export default apiService;