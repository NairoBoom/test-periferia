import { postsApi } from './axios';

export interface Post {
  id: string;
  message: string;
  userId: string;
  createdAt: string;
  likesCount: number;
  isLikedByUser: boolean;
}

interface CreatePostData {
  message: string;
}

export const postsService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await postsApi.get('/api/posts');
    return response.data;
  },

  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await postsApi.post('/api/posts', data);
    return response.data;
  },

  likePost: async (postId: string): Promise<void> => {
    await postsApi.post('/api/posts/like', { postId });
  },
};
