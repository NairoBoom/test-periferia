import { usersApi } from './axios';

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  alias: string;
  birthDate: string;
  createdAt: string;
}

export const usersService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await usersApi.get('/api/users/profile');
    return response.data;
  },

  getUserById: async (userId: string): Promise<UserProfile> => {
    const response = await usersApi.get(`/api/users/${userId}`);
    return response.data;
  },
};
