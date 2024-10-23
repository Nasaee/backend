import { NextFunction, Request, Response } from 'express';
import { getUserSchema } from '../schemas/user.schema';
import { InternalErrorException } from '../exceptions/InternalError';
import { db } from '../db';
import { NotFoundException } from '../exceptions/NotFound';
import { ErrorCode } from '../exceptions/RootExceptions';
import { BadRequestException } from '../exceptions/BadRequest';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { capitalText } from '../utils/capitalText';

export const createUser = async (req: Request, res: Response) => {
  const userSchema = await getUserSchema();

  try {
    const { name, lastName, nickName, birthDay, genderId } = userSchema.parse(
      req.body
    );
    const newUser = await db.user.create({
      data: {
        name: capitalText(name),
        lastName: capitalText(lastName),
        nickName: capitalText(nickName),
        birthDay,
        genderId,
      },
    });
    return res.send(newUser);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException(
        'User already exists',
        ErrorCode.USER_ALREADY_EXISTS
      );
    } else {
      throw new InternalErrorException('Something went wrong');
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      include: { gender: true },
      orderBy: { cratedAt: 'asc' },
    });
    return res.send(users);
  } catch (error) {
    throw new InternalErrorException('Something went wrong');
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userSchema = await getUserSchema();
  const userData = userSchema.parse(req.body);

  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      next(new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND));
    }
    const updatedUser = await db.user.update({
      where: { id },
      data: userData,
    });
    return res.send(updatedUser);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException(
        'User already exists',
        ErrorCode.USER_ALREADY_EXISTS
      );
    } else {
      throw new InternalErrorException('Something went wrong');
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.user.delete({ where: { id } });
    return res.send({ message: 'User deleted' });
  } catch (error) {
    throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND);
  }
};
