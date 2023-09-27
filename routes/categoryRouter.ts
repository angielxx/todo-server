import express from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.post('/', createCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);
