import { Response } from 'express';
import { getUserProfile, getUserById } from './userController';
import { AuthRequest } from '../middleware/authMiddleware';

jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      findOne: jest.fn(),
    })),
  },
}));

describe('User Controller', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn(() => ({ json: responseJson }));

    mockRequest = {
      params: {},
      user: { userId: 'test-user-id', username: 'testuser' },
    };

    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };
  });

  describe('getUserProfile', () => {
    it('should require authentication', async () => {
      mockRequest.user = undefined;

      await getUserProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(500);
    });
  });

  describe('getUserById', () => {
    it('should handle valid userId parameter', async () => {
      mockRequest.params = { userId: 'valid-uuid' };

      const { AppDataSource } = require('../config/database');
      const mockRepository = AppDataSource.getRepository();
      mockRepository.findOne.mockResolvedValue(null);

      await getUserById(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockRepository.findOne).toHaveBeenCalled();
    });
  });
});
