import { z } from 'zod';

export const genderSchema = z.object({
  gender: z.string().min(1).max(20),
});
