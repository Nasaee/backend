import { Router } from 'express';
import { errorHandler } from '../middlewares/errors.middleware';
import {
  createGender,
  deleteGender,
  getGender,
  updateGender,
} from '../controllers/gender.controller';

const genderRouter = Router();

genderRouter.post('/', errorHandler(createGender));

genderRouter.get('/', errorHandler(getGender));

genderRouter.patch('/:id', errorHandler(updateGender));

genderRouter.delete('/:id', errorHandler(deleteGender));

export default genderRouter;
