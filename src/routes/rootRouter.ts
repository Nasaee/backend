import { Router } from 'express';
import genderRouter from './gender.router';
import userRouter from './user.route';

const rootRouter = Router();

rootRouter.use('/gender', genderRouter);

rootRouter.use('/user', userRouter);

export default rootRouter;
