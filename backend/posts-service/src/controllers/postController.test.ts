import { Response } from 'express';
import { createPost, likePost } from './postController';
import { AuthRequest } from '../middleware/authMiddleware';

jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      })),
    })),
  },
}));

describe('Post Controller', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn(() => ({ json: responseJson }));

    mockRequest = {
      body: {},
      user: { userId: 'test-user-id', username: 'testuser' },
    };

    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };
  });

  describe('createPost', () => {
    it('should return 400 if message is empty', async () => {
      mockRequest.body = { message: '' };

      await createPost(mockRequest as AuthRequest, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Message is required',
      });
    });

    it('should reject message with only whitespace', async () => {
      mockRequest.body = { message: '   ' };

      await createPost(mockRequest as AuthRequest, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('likePost', () => {
    it('should return 400 if postId is not provided', async () => {
      mockRequest.body = {};

      await likePost(mockRequest as AuthRequest, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Post ID is required',
      });
    });
  });
});
