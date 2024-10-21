import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3).max(100),
  lastName: z.string().min(2).max(100),
  nickName: z.string().min(2).max(100),
  birthDay: z.string().min(2).max(100),
  genderId: z.string().min(2).max(100),
});
