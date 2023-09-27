import express from 'express';

import {
  createTodo,
  updateTodo,
  getTodos,
  getTodosByQuery,
  deleteTodo,
} from '../controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', getTodosByQuery);

todoRouter.get('/', getTodos);

todoRouter.post('/', createTodo);

todoRouter.put('/:id', updateTodo);

todoRouter.delete(':id', deleteTodo);

export default todoRouter;
