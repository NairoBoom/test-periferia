import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { login, validateToken } from './authController';

jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      findOne: jest.fn(),
    })),
  },
}));

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn(() => ({ json: responseJson }));

    mockRequest = {
      body: {},
      headers: {},
    };

    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };
  });

  describe('login', () => {
    it('should return 400 if username or password is missing', async () => {
      mockRequest.body = { username: 'testuser' };

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Username and password are required',
      });
    });

    it('should validate credentials format', async () => {
      mockRequest.body = { username: '', password: '' };

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('validateToken', () => {
    it('should return 401 if no token is provided', async () => {
      await validateToken(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'No token provided',
      });
    });

    it('should return 401 for invalid token format', async () => {
      mockRequest.headers = { authorization: 'InvalidToken' };

      await validateToken(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(401);
    });
  });
});
