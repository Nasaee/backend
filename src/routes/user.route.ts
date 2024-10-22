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

userRouter.patch('/:id', errorHandler(updateUser));

userRouter.delete('/:id', errorHandler(deleteUser));

export default userRouter;
