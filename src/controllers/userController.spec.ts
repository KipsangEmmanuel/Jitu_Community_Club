import mssql  from 'mssql';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { deleteUser, getMember, registerUser, updateUser } from './userController';
import { Request, Response } from 'express';

describe('Jitu Community Club Controller Tests', () => {
  let res: Response<any, Record<string, any>>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response<any, Record<string, any>>;
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const req = {
        body: { id: 'someId', username: 'newUsername', email: 'new@example.com' },
      } as unknown as Request;

      const mockedInput = jest.fn().mockReturnThis();
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute,
      };
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest),
      } as unknown as mssql.ConnectionPool;

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool);

      await updateUser(req as Request, res);

      expect(mockedExecute).toHaveBeenCalledWith('updateUser', {
        id: 'someId',
        username: 'newUsername',
        email: 'new@example.com',
        password: '',
      });

      expect(res.send).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const req = { params: { id: 'someId' } } as unknown as Request;

      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
      const mockedRequest = {
        execute: mockedExecute,
      };
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest),
      } as unknown as mssql.ConnectionPool;

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool);

      await deleteUser(req, res);

      expect(mockedExecute).toHaveBeenCalledWith('deleteUser', { id: 'someId' });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'User deleted Successfully' });
    });
  });

  describe('registerUser', () => {
    it('should register user successfully', async () => {
      const req = {
        body: { username: 'john_doe', password: 'password123', email: 'john.doe@thejitu.com' },
      } as unknown as Request;

      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword' as never);
      jest.spyOn(uuidv4, 'v4').mockReturnValueOnce('someId' as never);

      const mockedInput = jest.fn().mockReturnThis();
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute,
      };
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest),
      } as unknown as mssql.ConnectionPool;

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

      await registerUser(req as any, res as any);

      expect(mockedExecute).toHaveBeenCalledWith('registerUser', {
        id: 'someId',
        username: 'Emmanuel Kipsang',
        email: 'emmanuel.kipsang@thejitu.com',
        password: 'hashedPassword',
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });
  });

  describe('getMember', () => {
    it('should get member successfully', async () => {
      const req = { params: { id: 'someId' } } as unknown as Request;

      const mockedExecuteResult = { recordset: [{ id: 'someId', username: 'john_doe', email: 'john@example.com' }] };
      const mockedExecute = jest.fn().mockResolvedValue(mockedExecuteResult);
      const mockedRequest = {
        execute: mockedExecute,
      };
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest),
      } as unknown as mssql.ConnectionPool;

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool);

      await getMember(req as any, res);

      expect(mockedExecute).toHaveBeenCalledWith('getMemberById', { id: 'someId' });

      expect(res.json).toHaveBeenCalledWith(mockedExecuteResult.recordset);
    });
  });
});
