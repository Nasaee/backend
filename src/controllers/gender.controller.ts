import { Request, Response } from 'express';
import { genderSchema } from '../schemas/gender.schema';
import { db } from '../db';
import { InternalErrorException } from '../exceptions/InternalError';
import { NotFoundException } from '../exceptions/NotFound';
import { ErrorCode } from '../exceptions/RootExceptions';
import { Prisma } from '@prisma/client';
import { BadRequestException } from '../exceptions/BadRequest';

export const createGender = async (req: Request, res: Response) => {
  const { gender } = genderSchema.parse(req.body);
  try {
    const newGender = await db.gender.create({ data: { gender } });
    console.log(gender, newGender);
    return res.send(newGender);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestException(
        'Gender already exists',
        ErrorCode.GENDER_ALREADY_EXISTS
      );
    } else {
      throw new InternalErrorException('Something went wrong');
    }
  }
};

export const getGender = async (req: Request, res: Response) => {
  try {
    const gender = await db.gender.findMany();
    return res.send(gender);
  } catch (error) {
    throw new InternalErrorException('Something went wrong');
  }
};

export const updateGender = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gender } = genderSchema.parse(req.body);
  try {
    const updatedGender = await db.gender.update({
      where: { id },
      data: { gender },
    });
    return res.send(updatedGender);
  } catch (error) {
    throw new NotFoundException('Gender not found', ErrorCode.GENDER_NOT_FOUND);
  }
};

export const deleteGender = async (req: Request, res: Response) => {
  try {
    await db.gender.delete({ where: { id: req.params.id } });
    return res.send({ message: 'Gender deleted' });
  } catch (error) {
    throw new NotFoundException('Gender not found', ErrorCode.GENDER_NOT_FOUND);
  }
};
