import { z } from 'zod';
import { db } from '../../db';

export const getGenderEnum = async () => {
  const gender = await db.gender.findMany({
    select: {
      id: true,
    },
  });
  const genderIdArr = gender.map((item) => item.id);
  return z.enum([...genderIdArr] as [string, ...string[]]);
};
