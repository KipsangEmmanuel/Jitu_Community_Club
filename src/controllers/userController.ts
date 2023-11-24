import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mssql from 'mssql';

const sqlConfig = {
  user: 'sa',
  password: '@SQLserver1258631t',
  server: 'localhostr',
  database: 'jitu_club',
  options: {
    encrypt: true,
  },
};

interface Member {
  id: string;
  username: string;
  email: string;
  password: string;
}

const execute = async (procedureName: string, params: any): Promise<any> => {
  const pool = await mssql.connect(sqlConfig);
  const result = await pool.request();

  Object.entries(params).forEach(([key, value]) => {
    result.input(key, value);
  });

  return await result.execute(procedureName);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, username, email } = req.body;

    const newUser: Member = {
      id,
      username,
      email,
      password: '', 
    };

    const procedureName = 'updateUser';
    await execute(procedureName, newUser);
    
    return res.send({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: 'Internal Server Error',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send({ message: 'Id is required' });

    const procedureName = 'deleteUser';
    await execute(procedureName, { id });

    res.status(201).send({ message: 'User deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: 'Internal Server Error',
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, password, email, cohortNumber } = req.body;


    const hashedPwd = await bcrypt.hash(password, 5);

    const newUser: Member = {
      id: uuidv4(),
      username,
      email,
      password: hashedPwd,
    };

    const procedureName = 'registerUser';
    await execute(procedureName, newUser);

    return res.status(200).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: 'Internal Server Error',
    });
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send({ message: 'Id is required' });

    const procedureName = 'getMemberById';
    const result = await execute(procedureName, { id });

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: 'Internal Server Error',
    });
  }
};
