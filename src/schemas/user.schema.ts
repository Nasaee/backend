import { z } from 'zod';
import { getGenderEnum } from '../utils/enums/genderEnum';

const dateRegex = /^\d{4}-\d{2}-\d{2}(T.*)?$/;

export const getUserSchema = async () => {
  const genderIdEnum = await getGenderEnum();
  return z.object({
    name: z.string().min(3).max(100),
    lastName: z.string().min(2).max(100),
    nickName: z.string().min(1).max(100),
    birthDay: z
      .string()
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime()) && dateRegex.test(val);
        },
        {
          message: 'Invalid date format. Use at least YYYY-MM-DD',
        }
      )
      .transform((val) => {
        const date = new Date(val);
        return date.toISOString().split('T')[0] + 'T00:00:00.000Z';
      }),
    genderId: genderIdEnum,
  });
};
