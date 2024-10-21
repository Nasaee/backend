import { Router } from 'express';
import { errorHandler } from '../middlewares/errors.middleware';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', errorHandler(createUser));

userRouter.get('/', errorHandler(getUsers));

userRouter.patch('/', errorHandler(updateUser));

userRouter.delete('/', errorHandler(deleteUser));

export default userRouter;
