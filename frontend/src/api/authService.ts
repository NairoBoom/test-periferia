import { authApi } from './axios';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    alias: string;
    birthDate: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApi.post('/api/auth/login', credentials);
    return response.data;
  },
};
